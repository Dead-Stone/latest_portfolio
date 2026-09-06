'use client'

import { useCoarsePointer } from '@/lib/motion'
import { touchInput } from '@/lib/game/touchInput'

type DirKey = 'up' | 'down' | 'left' | 'right'

function DPadButton({ dir, glyph, className = '' }: { dir: DirKey; glyph: string; className?: string }) {
  const set = (v: boolean) => (e: React.PointerEvent) => {
    e.preventDefault()
    touchInput[dir] = v
  }
  return (
    <button
      type="button"
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      className={`flex h-11 w-11 touch-none select-none items-center justify-center rounded-lg border border-white/15 bg-white/10 text-base text-white/80 transition-colors active:bg-violet-500/40 ${className}`}
      aria-label={dir}
    >
      {glyph}
    </button>
  )
}

/** On-screen d-pad + interact button for coarse-pointer (touch) viewports; mutates the shared touchInput ref directly. */
export default function MobileControls() {
  const coarse = useCoarsePointer()
  if (!coarse) return null

  const setInteract = (v: boolean) => (e: React.PointerEvent) => {
    e.preventDefault()
    touchInput.interact = v
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4 sm:p-6">
      <div className="pointer-events-auto grid grid-cols-3 grid-rows-3 gap-1.5">
        <div />
        <DPadButton dir="up" glyph="↑" className="col-start-2" />
        <div />
        <DPadButton dir="left" glyph="←" className="row-start-2" />
        <div />
        <DPadButton dir="right" glyph="→" className="col-start-3 row-start-2" />
        <div />
        <DPadButton dir="down" glyph="↓" className="col-start-2 row-start-3" />
        <div />
      </div>

      <button
        type="button"
        onPointerDown={setInteract(true)}
        onPointerUp={setInteract(false)}
        onPointerLeave={setInteract(false)}
        onPointerCancel={setInteract(false)}
        aria-label="interact"
        className="pointer-events-auto flex h-14 w-14 touch-none select-none items-center justify-center rounded-full border border-violet-400/40 bg-violet-600/70 text-sm font-bold text-white transition-colors active:bg-violet-500"
      >
        E
      </button>
    </div>
  )
}
