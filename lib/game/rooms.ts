import { artPieces, jimCarreyStudies, type ArtPiece } from '@/data/art'
import { galleryAdditions } from '@/data/gallery-additions'
import { museumTrail } from './museumTrail'
export type Direction = 'up' | 'down' | 'left' | 'right'
export type WallSide = 'N' | 'S' | 'E' | 'W'
export const TILE = 32
export const WALL_T = 8
export type Point = { x: number; y: number }
export type PlanRect = { x: number; y: number; w: number; h: number }
export interface DoorDef extends PlanRect {
  side: WallSide; to: string; spawnAt: Point; facing: Direction
  label?: string
}
export interface PaintingSlot {
  art: ArtPiece; x: number; y: number; viewY: number; placement: 'wall' | 'pedestal'
}
export interface RoomDef {
  key: string; title: string; subtitle: string; number: string
  width: number; height: number; footprint: Point[]
  walls: PlanRect[]; props: { tile: number; x: number; y: number }[]
  /** Full safe itinerary used for automatic artwork-to-artwork routing. */
  route: Point[]
  /** Simple entrance-to-exit line shown on the floor and floor plan. */
  guideRoute: Point[]
  doors: DoorDef[]; paintings: PaintingSlot[]
  ropes?: PlanRect[]
  playerSpawn: Point & { facing: Direction }
}
const points = (coordinates: number[][]): Point[] => coordinates.map(([x,y]) => ({x,y}))
const walls = (rectangles: number[][]): PlanRect[] => rectangles.map(([x,y,w,h]) => ({x,y,w,h}))
const props = (items: number[][]) => items.map(([tile,x,y]) => ({tile,x,y}))
function findArt(id: number) {
  const art = artPieces.find(piece => piece.id === id)
  if (!art) throw new Error(`Unknown artwork ${id}`)
  return art
}
function hang(pieces: ArtPiece[], positions: number[][]): PaintingSlot[] {
  return pieces.map((art,i) => ({art,x:positions[i][0],y:positions[i][1],viewY:positions[i][1]+56,placement:'wall'}))
}
export function insideRoom(room: RoomDef,x:number,y:number) {
  let inside=false
  for(let i=0,j=room.footprint.length-1;i<room.footprint.length;j=i++){
    const a=room.footprint[i],b=room.footprint[j]
    if((a.y>y)!==(b.y>y) && x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside
  }
  return inside
}
export const ROOMS: Record<string,RoomDef> = {
  lobby: {
    key:'lobby',title:'The Expression Atrium',subtitle:'Nine faces of Jim Carrey: from a crooked smirk to a furious shout.',number:'01',width:640,height:512,
    footprint:points([[64,0],[576,0],[576,128],[640,128],[640,384],[576,384],[576,512],[64,512],[64,384],[0,384],[0,128],[64,128]]),
    walls:walls([[96,32,160,64],[384,32,160,64],[96,224,160,64],[384,224,160,64],[96,384,160,64]]),
    paintings:hang(jimCarreyStudies,[[128,64],[224,64],[416,64],[512,64],[128,256],[224,256],[416,256],[512,256],[160,416]]),
    props:props([[36,320,256],[40,160,176],[40,192,176],[40,448,176],[40,480,176],[44,80,128],[44,560,128],[44,48,352],[44,592,352],[41,416,456],[42,456,456],[43,480,352],[47,520,352]]),
    route:[],guideRoute:points([[320,480],[320,352],[352,352],[352,160],[320,160],[320,12]]),
    doors:[],playerSpawn:{x:320,y:160,facing:'up'},
  },
  portraits: {
    key:'portraits',title:'The Negative Collection',subtitle:'Premium negative works · velvet ropes, brass details and a closer look at inverted light.',number:'02',width:512,height:448,
    footprint:points([[0,0],[512,0],[512,256],[320,256],[320,448],[0,448]]),
    walls:walls([[48,32,384,64],[48,256,192,64]]),
    paintings:hang([1,2,3,22].map(findArt),[[112,64],[208,64],[304,64],[144,288]]).map(slot=>({...slot,viewY:slot.y+80})),
    ropes:[{x:64,y:112,w:352,h:4},{x:64,y:336,w:160,h:4}],
    props:props([[40,160,184],[40,192,184],[44,464,176],[44,48,208],[36,400,208],[43,80,400],[47,112,400]]),
    route:[],guideRoute:points([[160,400],[272,400],[272,224],[496,224],[496,192]]),
    doors:[],playerSpawn:{x:208,y:144,facing:'up'},
  },
  anime: {
    key:'anime',title:'The Anime Wing',subtitle:'Wanted posters, character studies and stories told in panels.',number:'03',width:640,height:448,
    footprint:points([[0,0],[640,0],[640,256],[544,256],[544,448],[96,448],[96,256],[0,256]]),
    walls:walls([[64,32,256,64],[384,128,192,64],[128,288,352,64]]),
    paintings:hang([5,6,7,14,15,16,17,18].map(findArt),[[112,64],[208,64],[288,64],[432,160],[528,160],[176,320],[272,320],[368,320]]),
    props:props([[38,496,64],[40,160,208],[40,192,208],[40,256,400],[40,288,400],[44,48,64],[44,592,224],[44,128,400],[47,528,64]]),
    route:[],guideRoute:points([[48,192],[48,236],[336,236],[336,256],[496,256],[496,236],[624,236],[624,192]]),
    doors:[],playerSpawn:{x:208,y:128,facing:'up'},
  },
  screenfilm: {
    key:'screenfilm',title:'Screen & Film',subtitle:'A cinema salon with staggered alcoves.',number:'04',width:576,height:448,
    footprint:points([[64,0],[512,0],[512,64],[576,64],[576,384],[480,384],[480,448],[96,448],[96,384],[0,384],[0,64],[64,64]]),
    walls:walls([[96,64,160,64],[352,160,160,64],[64,288,192,64]]),
    paintings:hang([8,10,13,19,20,21].map(findArt),[[128,96],[224,96],[400,192],[480,192],[96,320],[224,320]]),
    props:props([[40,160,208],[40,192,208],[43,416,80],[47,456,80],[40,384,320],[40,416,320],[44,48,176],[44,528,288],[44,448,400]]),
    route:[],guideRoute:points([[48,208],[48,236],[288,236],[288,256],[304,256],[304,384],[352,384],[352,440]]),
    doors:[],playerSpawn:{x:288,y:144,facing:'left'},
  },
  sports: {
    key:'sports',title:'Courtside Gallery',subtitle:'Basketball portraits along the players’ wall, with a sneaker-culture alcove.',number:'05',width:640,height:384,
    footprint:points([[64,0],[576,0],[576,64],[640,64],[640,320],[576,320],[576,384],[64,384],[64,320],[0,320],[0,64],[64,64]]),
    walls:walls([[96,32,224,64],[384,32,160,64],[64,224,160,64]]),
    paintings:hang([11,12].map(findArt),[[144,64],[144,256]]),
    props:props([[39,576,160],[47,576,208],[40,400,320],[40,432,320],[44,48,128],[44,592,288],[43,304,336]]),
    route:[],guideRoute:points([[352,48],[352,192],[256,192],[256,376]]),
    doors:[],playerSpawn:{x:272,y:144,facing:'up'},
  },
}
function connect(from: string, wing: string, hub: Omit<DoorDef,'to'|'spawnAt'|'facing'>, away: Omit<DoorDef,'to'|'spawnAt'|'facing'>, hubSpawn: Point, wingSpawn: Point, hubFacing: Direction, wingFacing: Direction) {
  ROOMS[from].doors.push({...hub,to:wing,spawnAt:wingSpawn,facing:wingFacing})
  ROOMS[wing].doors.push({...away,to:from,spawnAt:hubSpawn,facing:hubFacing})
}
for (const addition of galleryAdditions) {
  const room = ROOMS[addition.room]
  if (Object.values(ROOMS).some(r => r.paintings.some(p => p.art.id === addition.art.id))) throw new Error(`Duplicate gallery artwork id: ${addition.art.id}`)
  if (!room.walls.some(w => addition.x-16 >= w.x && addition.x+16 <= w.x+w.w && addition.y-16 >= w.y && addition.y+16 <= w.y+w.h)) throw new Error(`Artwork must fit a display wall: ${addition.art.title}`)
  if (room.paintings.some(p => Math.abs(p.x-addition.x)<40 && Math.abs(p.y-addition.y)<40)) throw new Error(`Artwork overlaps another frame: ${addition.art.title}`)
  room.paintings.push({art:addition.art,x:addition.x,y:addition.y,viewY:addition.y+(addition.room==='portraits'?80:56),placement:'wall'})
}
// A continuous, reversible visitor journey; no mandatory return to a central hub.
export const VISITOR_ROUTE = ['lobby','portraits','anime','screenfilm','sports'] as const
connect('lobby','portraits',{side:'N',x:288,y:0,w:64,h:16},{side:'S',x:128,y:432,w:64,h:16},{x:320,y:112},{x:160,y:400},'down','up')
connect('portraits','anime',{side:'E',x:496,y:160,w:16,h:64},{side:'W',x:0,y:160,w:16,h:64},{x:464,y:208},{x:48,y:192},'left','right')
connect('anime','screenfilm',{side:'E',x:624,y:160,w:16,h:64},{side:'W',x:0,y:160,w:16,h:64},{x:592,y:192},{x:48,y:208},'left','right')
connect('screenfilm','sports',{side:'S',x:320,y:432,w:64,h:16},{side:'N',x:320,y:0,w:64,h:16},{x:352,y:400},{x:352,y:48},'up','down')
ROOMS.lobby.doors.push({side:'S',x:288,y:496,w:64,h:16,to:'__exit',label:'ENTRANCE',spawnAt:{x:320,y:464},facing:'up'})
ROOMS.sports.doors.push({side:'S',x:224,y:368,w:64,h:16,to:'__exit',label:'EXIT',spawnAt:{x:256,y:336},facing:'up'})
VISITOR_ROUTE.forEach((key,index)=>{
  const room=ROOMS[key]
  const previous=index?ROOMS[VISITOR_ROUTE[index-1]]:null
  const start=previous?.doors.find(d=>d.to===key)?.spawnAt ?? {x:320,y:480}
  const next=VISITOR_ROUTE[index+1] ?? '__exit'
  const door=room.doors.find(d=>d.to===next)!
  const finish={x:Math.max(16,Math.min(room.width-16,door.x+door.w/2)),y:Math.max(12,Math.min(room.height-8,door.y+door.h/2))}
  room.route=museumTrail(room,start,finish)
})
