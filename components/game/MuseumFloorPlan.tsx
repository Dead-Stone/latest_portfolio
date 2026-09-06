'use client'

import { useEffect, useRef } from 'react'
import { ROOMS, VISITOR_ROUTE, type Point } from '@/lib/game/rooms'
import { galleryFurnishings, furnishingBounds } from '@/lib/game/galleryFurnishings'

const scale = 0.32
const positions: Record<string, Point> = {
  lobby:{x:70,y:400},portraits:{x:121,y:120},anime:{x:385,y:120},
  screenfilm:{x:650,y:120},sports:{x:650,y:400},
}
const color:Record<string,string>={lobby:'#eee1cb',portraits:'#b9adb6',anime:'#e5dcef',screenfilm:'#b9adb6',sports:'#d9bf93'}
function mapPoint(key:string,p:Point){return{x:positions[key].x+p.x*scale,y:positions[key].y+p.y*scale}}
export default function MuseumFloorPlan({roomKey,player,onClose,onNavigate}:{roomKey:string;player:{roomKey:string;x:number;y:number};onClose:()=>void;onNavigate:(key:string)=>void}){
  const close=useRef<HTMLButtonElement>(null)
  const panel=useRef<HTMLDivElement>(null)
  useEffect(()=>{close.current?.focus()},[])
  return (
    <div className="absolute inset-x-0 bottom-10 top-20 z-20 bg-[#181722]/40 p-3 sm:px-6">
    <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="museum-map-title" className="flex h-full flex-col overflow-y-auto rounded-xl border border-[#baa58b]/60 bg-[#fffaf0] px-4 py-5 shadow-xl sm:px-8" onKeyDown={event=>{
      if(event.key!=='Tab')return
      const nodes=panel.current?.querySelectorAll<HTMLElement>('button,[tabindex="0"]')
      if(!nodes?.length)return
      if(event.shiftKey&&document.activeElement===nodes[0]){event.preventDefault();nodes[nodes.length-1].focus()}
      else if(!event.shiftKey&&document.activeElement===nodes[nodes.length-1]){event.preventDefault();nodes[0].focus()}
    }}>
      <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-4">
        <div><p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#846240]">Museum floor plan</p><h2 id="museum-map-title" className="mt-1 font-serif text-2xl sm:text-3xl">From entrance to exit.</h2><p className="mt-1 text-xs text-[#746975]">Five galleries, one continuous journey. Follow the arrows or select any room.</p></div>
        <button ref={close} type="button" onClick={onClose} aria-label="Close floor plan" className="rounded-full border border-[#705741]/30 px-3 py-2">✕</button>
      </div>
      <svg viewBox="0 0 900 665" className="mx-auto mt-2 min-h-[310px] w-full max-w-5xl flex-1" aria-label="Entire entrance-to-exit museum: Expressions, Premium Negatives, Anime, Screen and Film, Courtside, with connecting doors and your position" role="img">
        <defs><pattern id="plan-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M 16 0 L 0 0 0 16" fill="none" stroke="#baa58b" strokeWidth=".3" opacity=".3"/></pattern><marker id="journey-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="#8960a3" strokeWidth="2"/></marker></defs>
        <rect width="900" height="665" fill="url(#plan-grid)"/>
        {VISITOR_ROUTE.slice(0,-1).map((key,index)=>{
          const next=VISITOR_ROUTE[index+1]
          const d=ROOMS[key].doors.find(door=>door.to===next)!
          const a=mapPoint(key,{x:d.x+d.w/2,y:d.y+d.h/2})
          const back=ROOMS[next].doors.find(door=>door.to===key)!
          const b=mapPoint(d.to,{x:back.x+back.w/2,y:back.y+back.h/2})
          const middle=(a.y+b.y)/2
          const path=d.side==='E'||d.side==='W'?`M${a.x},${a.y} H${(a.x+b.x)/2} V${b.y} H${b.x}`:`M${a.x},${a.y} V${middle} H${b.x} V${b.y}`
          return <g key={key}><path d={path} fill="none" stroke="#705741" strokeWidth="17"/><path d={path} fill="none" stroke="#eee1cb" strokeWidth="13"/><path d={path} fill="none" stroke="#8960a3" strokeWidth="2" strokeDasharray="5 5" markerMid="url(#journey-arrow)" markerEnd="url(#journey-arrow)"/></g>
        })}
        <g fontFamily="monospace" textAnchor="middle">
          <path d="M172.4 616 V564" stroke="#537346" strokeWidth="3" markerEnd="url(#journey-arrow)"/>
          <text x="172" y="642" fontSize="15" fill="#537346">ENTRANCE</text>
          <path d="M732 523 V616" stroke="#8960a3" strokeWidth="3" markerEnd="url(#journey-arrow)"/>
          <text x="732" y="642" fontSize="15" fill="#633c78">EXIT</text>
          <text x="450" y="435" fontSize="11" letterSpacing="2" fill="#846240">THE VISITOR JOURNEY</text>
          <text x="450" y="456" fontSize="10" fill="#846240">01 → 02 → 03 → 04 → 05</text>
          <text x="450" y="477" fontSize="9" fill="#846240">Explore freely · return through any doorway</text>
        </g>
        {Object.values(ROOMS).map(room=>{
          const pos=positions[room.key],active=room.key===roomKey
          return <g key={room.key} role="button" tabIndex={0} aria-label={`Visit ${room.title}`} onClick={()=>onNavigate(room.key)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onNavigate(room.key)}}} className="cursor-pointer outline-none focus:[&_polygon]:stroke-[#8b5cf6]">
            <title>{room.title} · {room.paintings.length} drawings{active?' · You are here':''}</title>
            <g transform={`translate(${pos.x} ${pos.y}) scale(${scale})`}>
              <polygon points={room.footprint.map(p=>`${p.x},${p.y}`).join(' ')} fill={color[room.key]} stroke={active?'#8960a3':'#705741'} strokeWidth={active?9:5}/>
              <polyline points={room.guideRoute.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="#b38d54" strokeWidth="6"/>
              {room.walls.map((wall,i)=><rect key={i} x={wall.x} y={wall.y} width={wall.w} height={wall.h} fill="#a99a8a" stroke="#705741" strokeWidth="2"/>)}
              {(room.ropes??[]).map((rope,i)=><g key={i}><path d={`M${rope.x},${rope.y} H${rope.x+rope.w}`} stroke="#853748" strokeWidth="5"/><circle cx={rope.x} cy={rope.y} r="6" fill="#b38d54"/><circle cx={rope.x+rope.w} cy={rope.y} r="6" fill="#b38d54"/></g>)}
              {room.key==='sports'?<g fill="none" stroke="#fff3dc" strokeWidth="3"><rect x="272" y="128" width="272" height="160"/><path d="M408 128 V288"/><circle cx="408" cy="208" r="24"/></g>:null}
              {room.props.map((prop,i)=><rect key={i} x={prop.x-10} y={prop.y-20} width="20" height="20" rx={prop.tile===44?10:2} fill={prop.tile===44?'#537346':'#846240'} opacity=".8"/>)}
              {(galleryFurnishings[room.key]??[]).map((p,i)=>{const b=furnishingBounds(p);return <rect key={`furnishing-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} fill="#846240"><title>{p.kind}</title></rect>})}
              {room.paintings.map(p=><rect key={p.art.id} x={p.x-10} y={p.y-10} width="20" height="20" fill="#fff3dc" stroke="#514854" strokeWidth="3"/>)}
              {room.doors.map(d=><rect key={d.to} x={d.x} y={d.y} width={d.w} height={d.h} fill="#e7bb6a"/>)}
              {player.roomKey===room.key?<g><circle cx={player.x} cy={player.y} r="15" fill="#fff3dc"/><circle cx={player.x} cy={player.y} r="10" fill="#8b5cf6"/></g>:null}
            </g>
            <text x={pos.x+room.width*scale/2} y={pos.y-12} textAnchor="middle" fontSize="13" fontFamily="Georgia,serif" fill="#302b34">{room.number} · {room.title}</text>
            <text x={pos.x+room.width*scale/2} y={pos.y+room.height*scale+18} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={active?'#633c78':'#846240'}>{room.paintings.length} WORKS{active?' · YOU ARE HERE':''}</text>
          </g>
        })}
        <g transform="translate(390 558)" fontSize="10" fontFamily="monospace" fill="#705741"><circle cx="4" cy="0" r="4" fill="#8b5cf6"/><text x="16" y="3">Your position</text><rect x="0" y="17" width="8" height="8" fill="#fff3dc" stroke="#514854"/><text x="16" y="25">Artwork</text><path d="M0 44 H10" stroke="#b38d54" strokeWidth="3"/><text x="16" y="47">Connecting corridor</text></g>
      </svg>
      <nav aria-label="Museum rooms" className="mx-auto mt-2 flex max-w-5xl flex-wrap justify-center gap-2">
        {Object.values(ROOMS).map(room=><button key={room.key} type="button" aria-current={roomKey===room.key?'location':undefined} onClick={()=>onNavigate(room.key)} className={`rounded-full border px-3 py-1.5 text-[11px] ${roomKey===room.key?'border-[#8960a3] bg-[#eee3f0]':'border-[#baa58b]/50 bg-[#fffaf0]'}`}>{room.number} {room.title}</button>)}
      </nav>
    </div>
    </div>
  )
}
