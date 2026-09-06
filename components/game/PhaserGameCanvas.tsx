'use client'

import { useEffect, useRef, useState } from 'react'
import type * as Phaser from 'phaser'
import type { ArtPiece } from '@/data/art'
import { ROOMS } from '@/lib/game/rooms'
import { gameEvents, GameEvent, type DialogueOpenPayload, type PaintingNearPayload } from '@/lib/game/gameEvents'
import { resetTouchInput, touchInput } from '@/lib/game/touchInput'
import DialogueBox from './DialogueBox'
import MobileControls from './MobileControls'
import MuseumFloorPlan from './MuseumFloorPlan'
import NearbyArtwork from './NearbyArtwork'
import MohanWelcome from './MohanWelcome'

export default function PhaserGameCanvas({ onExit }: { onExit: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [nearArt, setNearArt] = useState<ArtPiece | null>(null)
  const [dialogueArt, setDialogueArt] = useState<ArtPiece | null>(null)
  const [roomKey, setRoomKey] = useState('lobby')
  const [playerPosition, setPlayerPosition] = useState({roomKey:'lobby',x:320,y:160})
  const [guide, setGuide] = useState(false)
  const [seen, setSeen] = useState<Set<number>>(new Set())
  const [entering, setEntering] = useState(false)
  const [hint, setHint] = useState('')
  const [welcome, setWelcome] = useState(true)
  const totalArt = Object.values(ROOMS).reduce((sum, room) => sum + room.paintings.length, 0)
  useEffect(() => {
    gameEvents.on(GameEvent.EXIT,onExit)
    return () => { gameEvents.off(GameEvent.EXIT,onExit) }
  },[onExit])

  useEffect(() => {
    let destroyed = false
    const onReady = () => setReady(true)
    const onNear = (payload: PaintingNearPayload) => setNearArt(payload.art)
    const onDialogue = (payload: DialogueOpenPayload) => {
      setDialogueArt(payload.art)
      setSeen(current => new Set(current).add(payload.art.id))
    }
    const onRoom = (key: string) => setRoomKey(key)
    const onPosition = (position: {roomKey:string;x:number;y:number}) => setPlayerPosition(position)
    const onGuide = () => setGuide(true)
    const onArrival = (active: boolean) => setEntering(active)
    const onHint = (message: string) => setHint(message)
    gameEvents.on(GameEvent.GUIDE_OPEN, onGuide)
    gameEvents.on(GameEvent.ARRIVAL, onArrival)
    gameEvents.on(GameEvent.HINT, onHint)
    gameEvents.on(GameEvent.POSITION, onPosition)
    gameEvents.on(GameEvent.READY, onReady)
    gameEvents.on(GameEvent.PAINTING_NEAR, onNear)
    gameEvents.on(GameEvent.DIALOGUE_OPEN, onDialogue)
    gameEvents.on(GameEvent.ROOM_CHANGED, onRoom)
    ;(async () => {
      try {
        const [P, lobby, portraits, anime, film, sports] = await Promise.all([
          import('phaser'), import('@/lib/game/scenes/LobbyScene'),
          import('@/lib/game/scenes/PortraitsScene'), import('@/lib/game/scenes/AnimeScene'),
          import('@/lib/game/scenes/ScreenFilmScene'), import('@/lib/game/scenes/SportsScene'),
        ])
        if (destroyed || !containerRef.current) return
        gameRef.current = new P.Game({
          type: P.AUTO, parent: containerRef.current,
          width: containerRef.current.clientWidth, height: containerRef.current.clientHeight,
          pixelArt: true, roundPixels: true, antialias: false,
          backgroundColor: '#e9dfcb',
          physics: { default: 'arcade', arcade: { debug: false } },
          scale: { mode: P.Scale.RESIZE, autoRound: true },
          scene: [lobby.default, portraits.default, anime.default, film.default, sports.default],
        })
      } catch {
        if (!destroyed) setError('The gallery could not load. Please close it and try again.')
      }
    })()
    return () => {
      destroyed = true
      gameEvents.off(GameEvent.READY, onReady)
      gameEvents.off(GameEvent.PAINTING_NEAR, onNear)
      gameEvents.off(GameEvent.DIALOGUE_OPEN, onDialogue)
      gameEvents.off(GameEvent.ROOM_CHANGED, onRoom)
      gameEvents.off(GameEvent.POSITION, onPosition)
      gameEvents.off(GameEvent.GUIDE_OPEN, onGuide)
      gameEvents.off(GameEvent.ARRIVAL, onArrival)
      gameEvents.off(GameEvent.HINT, onHint)
      gameRef.current?.destroy(true, false)
      gameRef.current = null
      resetTouchInput()
      touchInput.locked = false
    }
  }, [])

  useEffect(() => {
    touchInput.locked = Boolean(dialogueArt) || guide || welcome
    if (dialogueArt || guide) gameEvents.emit(GameEvent.CANCEL_WALK)
    resetTouchInput()
  }, [dialogueArt, guide, welcome])

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      if (welcome) { if(ready) setWelcome(false) }
      else if (dialogueArt) setDialogueArt(null)
      else if (guide) setGuide(false)
      else onExit()
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [dialogueArt, guide, welcome, ready, onExit])

  const room = ROOMS[roomKey]
  const cycle = (direction: 1 | -1) => {
    if (!dialogueArt) return
    const index = room.paintings.findIndex(p => p.art.id === dialogueArt.id)
    const next = room.paintings[(index + direction + room.paintings.length) % room.paintings.length].art
    setDialogueArt(next)
    setSeen(current => new Set(current).add(next.id))
  }

  return (
    <div className="fixed inset-0 z-[70] bg-[#e9dfcb] text-[#302b34]">
      <header className="absolute inset-x-0 top-0 z-10 flex h-20 items-center justify-between gap-3 border-b border-[#705741]/20 bg-[#f8f2e7] px-4 sm:px-7">
        <button type="button" onClick={onExit} className="rounded-full border border-[#705741]/25 px-3 py-2 text-xs transition hover:bg-[#e9dfcb]" aria-label="Exit gallery walk">← <span className="hidden sm:inline">Art World</span></button>
        <div className="min-w-0 text-center">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[#846240]">signedbyMMS · room {room.number}</p>
          <h1 className="truncate font-serif text-xl sm:text-2xl">{room.title}</h1>
        </div>
        <button type="button" disabled={entering || welcome} onClick={() => setGuide(v => !v)} className="rounded-full bg-[#302b34] px-4 py-2 text-xs text-[#fff3dc] transition hover:bg-[#514854] disabled:opacity-50">Floor plan</button>
      </header>

      <div ref={containerRef} className="absolute inset-x-0 bottom-10 top-20 overflow-hidden [&_canvas]:block [&_canvas]:!touch-none" style={{ imageRendering: 'pixelated' }} aria-label="Interactive museum. Walk with arrows, WASD, or click the floor. Click a painting to walk to it. Press E near artwork, benches, or information desks." role="application" />

      {!ready || error ? <div role="status" className="absolute inset-x-0 bottom-10 top-20 z-10 flex items-center justify-center bg-[#e9dfcb] px-8 text-center text-sm text-[#705741]">{error || 'Opening the museum…'}</div> : null}

      {ready && !error && welcome ? <MohanWelcome onEnter={()=>setWelcome(false)} /> : null}
      {entering && !welcome ? <div className="absolute bottom-24 left-1/2 z-20 w-max max-w-[85vw] -translate-x-1/2"><button type="button" onClick={()=>gameEvents.emit(GameEvent.SKIP_ARRIVAL)} className="rounded-lg border border-[#baa58b]/60 bg-[#fffaf0] px-5 py-3 text-sm shadow-lg"><span className="mr-2 font-semibold">Mohan:</span>Come on in. Let’s take a look. →</button></div> : null}

      <footer className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between border-t border-[#705741]/20 bg-[#f8f2e7] px-4 font-mono text-[10px] text-[#705741] sm:px-7">
        <span className="hidden sm:block">CLICK / WASD · WALK &nbsp; E · INTERACT &nbsp; FLOOR PLAN · EXPLORE ROOMS</span>
        <span className="sm:hidden">Walk · Floor plan for rooms</span>
        <span>{seen.size} / {totalArt} discovered</span>
      </footer>

      {nearArt && !dialogueArt && !guide && !entering && !welcome ? (
        <NearbyArtwork key={nearArt.id} art={nearArt} onOpen={() => { setDialogueArt(nearArt); setSeen(current => new Set(current).add(nearArt.id)) }} />
      ) : null}
      {!nearArt && hint && !dialogueArt && !guide && !entering && !welcome ? <div className="absolute bottom-24 left-1/2 z-10 w-max max-w-[78vw] -translate-x-1/2"><button type="button" aria-live="polite" onClick={() => { touchInput.interact = true }} className="rounded-lg border border-[#baa58b]/60 bg-[#fffaf0] px-5 py-3 text-center text-xs shadow-lg">{hint}</button></div> : null}
      {!dialogueArt && !guide && !entering && !welcome ? <MobileControls /> : null}

      {guide ? <MuseumFloorPlan roomKey={roomKey} player={playerPosition} onClose={() => setGuide(false)} onNavigate={key => {
        setGuide(false)
        if (key !== roomKey) gameEvents.emit(GameEvent.NAVIGATE, key)
      }} /> : null}

      {dialogueArt ? <DialogueBox key={dialogueArt.id} art={dialogueArt} onClose={() => setDialogueArt(null)} onPrev={() => cycle(-1)} onNext={() => cycle(1)} hasSiblings={room.paintings.length > 1} /> : null}
    </div>
  )
}
