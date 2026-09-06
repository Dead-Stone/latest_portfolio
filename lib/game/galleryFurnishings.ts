import type * as Phaser from 'phaser'

type Kind = 'hoop' | 'balls' | 'weights' | 'lockers' | 'water' | 'easel' | 'supplies' | 'catalogue' | 'jewel' | 'lamp' | 'manga' | 'figure' | 'lantern' | 'camera' | 'clapper' | 'reels'
export interface Furnishing { kind: Kind; x: number; y: number; facing?: 'left' | 'right' }
export const galleryFurnishings: Record<string,Furnishing[]> = {
  lobby:[{kind:'easel',x:288,y:192},{kind:'supplies',x:544,y:416},{kind:'catalogue',x:80,y:192}],
  portraits:[{kind:'lamp',x:448,y:64},{kind:'jewel',x:304,y:304},{kind:'catalogue',x:352,y:176}],
  anime:[{kind:'manga',x:368,y:80},{kind:'figure',x:512,y:400},{kind:'lantern',x:80,y:200}],
  screenfilm:[{kind:'camera',x:304,y:80},{kind:'reels',x:496,y:336},{kind:'clapper',x:144,y:416}],
  sports:[{kind:'hoop',x:288,y:208,facing:'right'},{kind:'hoop',x:528,y:208,facing:'left'},{kind:'balls',x:464,y:320},{kind:'weights',x:368,y:336},{kind:'lockers',x:560,y:80},{kind:'water',x:600,y:272}],
}

// The same floor footprint is used by physics, route planning and the floor plan.
export function furnishingBounds(p:Furnishing) { return {x:p.x-12,y:p.y-6,w:24,h:12} }

/** Native integer-pixel furnishings, sharing the museum palette and depth ordering. */
export function drawFurnishing(scene:Phaser.Scene,p:Furnishing) {
  const g=scene.add.graphics().setPosition(p.x,p.y).setDepth(p.y+10)
  const ink=0x302b34,wood=0x846240,gold=0xe7bb6a,paper=0xfff3dc,metal=0x968c99,red=0x853748
  const r=(x:number,y:number,w:number,h:number,c:number)=>g.fillStyle(c).fillRect(x,y,w,h)
  const base=()=>{r(-12,-6,24,12,ink);r(-10,-4,20,8,wood)}
  const ball=(x:number,y:number)=>{r(x+2,y,8,2,ink);r(x,y+2,12,8,ink);r(x+2,y+10,8,2,ink);r(x+2,y+2,8,8,0xc98237);r(x+5,y+1,2,10,wood);r(x+1,y+5,10,2,wood)}
  switch(p.kind){
    case 'hoop':
      // Side-on court hoop: thin backboard at the outside, rim projecting into the court.
      if(p.facing==='left')g.setScale(-1,1)
      base();r(-12,-36,4,34,metal);r(-15,-42,6,24,ink);r(-14,-40,3,20,paper)
      // Horizontal ring and tapered net project sideways from the backboard edge.
      r(-9,-27,5,3,metal)
      r(-3,-22,1,7,paper);r(2,-22,1,9,paper);r(7,-22,1,7,paper)
      r(-2,-18,10,1,paper);r(0,-14,6,1,paper)
      r(-3,-29,12,2,0xc98237);r(-6,-27,3,3,0xc98237);r(9,-27,3,3,0xc98237);r(-3,-24,12,2,red)
      r(-13,-7,6,2,metal);break
    case 'balls':
      base();r(-14,-28,3,25,metal);r(11,-28,3,25,metal);r(-14,-14,28,3,metal)
      ball(-12,-26);ball(1,-26);ball(-6,-12);break
    case 'weights':
      base();r(-11,-17,3,15,metal);r(8,-17,3,15,metal)
      for(const y of [-22,-10]){r(-14,y+4,28,3,metal);for(const x of [-14,-9,6,11])r(x,y,3,11,ink)}break
    case 'lockers':
      base();r(-14,-38,28,38,ink)
      for(const x of [-12,1]){r(x,-36,11,34,0x537346);for(const y of [-32,-29,-26])r(x+2,y,7,1,ink);r(x+7,-17,2,5,gold)}break
    case 'water':
      base();r(-8,-28,16,27,paper);r(-6,-41,12,14,0x738f9b);r(-4,-39,3,10,0xb3c8c7);r(-5,-24,10,9,ink);r(-3,-21,2,3,red);r(2,-21,2,3,0x738f9b);r(-5,-9,10,3,metal);break
    case 'easel':
      r(-11,-3,4,9,wood);r(7,-3,4,9,wood);r(-2,-39,4,44,wood);r(-15,-35,30,29,wood);r(-12,-32,24,23,paper)
      r(-5,-28,10,5,ink);r(-7,-23,14,9,0xb38d54);r(-4,-16,8,3,ink);r(-16,-7,32,3,wood);break
    case 'supplies':
      base();r(-15,-19,30,5,wood);r(-12,-14,3,17,wood);r(9,-14,3,17,wood)
      r(-10,-25,10,6,paper);r(4,-28,7,9,metal);r(5,-35,2,10,red);r(9,-33,2,8,0x633c78);break
    case 'catalogue':
      base();r(-2,-23,4,22,wood);r(-14,-28,28,11,ink);r(-12,-26,11,7,paper);r(1,-26,11,7,paper)
      for(const y of [-24,-21]){r(-10,y,7,1,wood);r(3,y,7,1,wood)}break
    case 'jewel':
      base();r(-10,-18,20,18,metal);r(-12,-21,24,4,gold);r(-11,-37,22,16,0x738f9b);r(-9,-35,18,12,0x514854)
      r(-4,-32,8,3,gold);r(-6,-29,12,5,gold);r(-3,-24,6,3,red);r(-8,-34,2,11,paper);break
    case 'lamp':
      base();r(-2,-32,4,31,gold);r(-8,-38,16,5,gold);r(-12,-33,24,8,paper);r(-14,-25,28,3,gold);break
    case 'manga':
      base();r(-14,-38,28,39,wood);r(-12,-36,24,33,ink)
      for(const y of [-34,-19]){for(let x=-10;x<=8;x+=5){r(x,y,4,12,[paper,red,0x633c78,0x537346][(x+10)/5%4]);r(x+1,y+2,2,2,gold)}r(-12,y+12,24,2,wood)}break
    case 'figure':
      base();r(-10,-14,20,15,metal);r(-12,-17,24,4,gold);r(-5,-23,4,6,ink);r(2,-23,4,6,ink);r(-7,-33,14,12,0x633c78);r(-5,-41,10,9,0xb38d54);r(-7,-44,14,5,ink);break
    case 'lantern':
      base();r(-2,-42,4,40,wood);r(-10,-39,20,3,gold);r(-12,-35,24,22,red);r(-10,-13,20,3,gold)
      for(const x of [-8,-1,6])r(x,-33,2,18,0xc98237);r(-1,-9,2,6,gold);break
    case 'camera':
      base();r(-2,-20,4,24,metal);r(-11,-28,21,14,ink);r(10,-26,8,10,metal);r(-10,-39,9,10,metal);r(1,-39,9,10,metal);r(-7,-36,3,4,ink);r(4,-36,3,4,ink);r(-7,-25,5,3,gold);break
    case 'clapper':
      base();r(-2,-20,4,19,wood);r(-14,-35,28,19,ink);r(-14,-39,28,6,paper)
      for(let x=-12;x<12;x+=8)r(x,-39,4,6,ink)
      r(-10,-29,20,1,paper);r(-10,-24,12,1,paper);r(-10,-20,16,1,paper);break
    case 'reels':
      base();r(-14,-21,28,20,wood);r(-12,-18,24,3,metal);r(-12,-11,24,3,metal);r(-12,-4,24,3,metal)
      for(const x of [-11,2]){r(x,-34,11,12,metal);r(x+4,-31,3,6,ink);r(x+1,-29,9,2,ink)}break
  }
}
