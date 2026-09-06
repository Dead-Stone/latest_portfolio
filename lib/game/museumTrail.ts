import type { RoomDef, Point, PlanRect } from './rooms'
import { walkingPath } from './navigation'
import { galleryFurnishings, furnishingBounds } from './galleryFurnishings'

/** Collision geometry shared by itinerary planning and its regression checks. */
export function roomObstacles(room:RoomDef):PlanRect[] {
  const rects=[...room.walls,...(room.ropes??[]),...room.props.map(p=>({x:p.x-10,y:p.y-8,w:20,h:6})),...(galleryFurnishings[room.key]??[]).map(furnishingBounds)]
  const inside=(x:number,y:number)=>{
    let result=false
    for(let i=0,j=room.footprint.length-1;i<room.footprint.length;j=i++) {
      const a=room.footprint[i],b=room.footprint[j]
      if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)result=!result
    }
    return result
  }
  const atDoor=(side:string,x:number,y:number)=>room.doors.some(d=>d.side===side&&x>=d.x&&x<=d.x+d.w&&y>=d.y&&y<=d.y+d.h)
  for(let y=0;y<room.height;y+=32)for(let x=0;x<room.width;x+=32){
    if(!inside(x+16,y+16)){rects.push({x,y,w:32,h:32});continue}
    if(!inside(x+16,y-16)&&!atDoor('N',x+16,y))rects.push({x,y,w:32,h:8})
    if(!inside(x+16,y+48)&&!atDoor('S',x+16,y+32))rects.push({x,y:y+24,w:32,h:8})
    if(!inside(x-16,y+16)&&!atDoor('W',x,y+16))rects.push({x,y,w:8,h:32})
    if(!inside(x+48,y+16)&&!atDoor('E',x+32,y+16))rects.push({x:x+24,y,w:8,h:32})
  }
  return rects
}

export function museumTrail(room:RoomDef,start:Point,finish:Point):Point[] {
  const obstacles=roomObstacles(room)
  const distance=(a:Point,b:Point)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y)
  const original=room.paintings.map(p=>({x:p.x,y:p.viewY}))
  const remaining=[...original], ordered:Point[]=[]
  let current=start
  // Visit nearby walls first, rather than zigzagging in artwork/upload order.
  while(remaining.length){
    remaining.sort((a,b)=>distance(current,a)-distance(current,b))
    current=remaining.shift()!
    ordered.push(current)
  }
  const stops=[start,...ordered,finish]
  // Untangle crossing detours while keeping the entrance and next doorway fixed.
  for(let pass=0;pass<stops.length;pass++){
    let changed=false
    for(let i=1;i<stops.length-2;i++)for(let j=i+1;j<stops.length-1;j++){
      if(distance(stops[i-1],stops[j])+distance(stops[i],stops[j+1]) <
         distance(stops[i-1],stops[i])+distance(stops[j],stops[j+1])){
        stops.splice(i,j-i+1,...stops.slice(i,j+1).reverse())
        changed=true
      }
    }
    if(!changed)break
  }
  const build=(targets:Point[])=>{
    const trail=[start]
    for(const target of targets){
      const segment=walkingPath(trail[trail.length-1],target,room.width,room.height,obstacles)
      if(!segment)throw new Error(`No safe visitor trail in ${room.title} to ${target.x},${target.y}`)
      trail.push(...segment)
    }
    return trail
  }
  const optimized=build(stops.slice(1)), baseline=build([...original,finish])
  const length=(trail:Point[])=>trail.slice(1).reduce((sum,p,i)=>sum+distance(trail[i],p),0)
  // Furniture detours can invalidate geometric shortcuts: never lengthen the actual walk.
  return length(optimized)<=length(baseline)?optimized:baseline
}
