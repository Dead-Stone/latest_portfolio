'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { ArtPiece } from '@/data/art'
import { frameFor } from '@/lib/game/assets'

interface DialogueBoxProps {
  art: ArtPiece; onClose: () => void; onPrev: () => void; onNext: () => void; hasSiblings: boolean
}
export default function DialogueBox({ art, onClose, onPrev, onNext, hasSiblings }: DialogueBoxProps) {
  const frame = frameFor(art)
  const isNegative = frame.negative
  const [negative, setNegative] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    close.current?.focus()
    return () => previous?.focus()
  }, [])
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#181722]/60 px-3 pb-14 pt-4 sm:px-8" onClick={onClose}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="museum-art-title" className="relative grid max-h-[82dvh] w-full max-w-5xl overflow-y-auto rounded-xl border border-[#baa58b]/60 bg-[#fffaf0] shadow-2xl md:grid-cols-[1.3fr_1fr]" onClick={event => event.stopPropagation()} onKeyDown={event => {
        if (event.key === 'ArrowLeft' && hasSiblings) { event.preventDefault(); onPrev() }
        if (event.key === 'ArrowRight' && hasSiblings) { event.preventDefault(); onNext() }
        if (event.key === 'Tab') {
          const nodes = panel.current?.querySelectorAll<HTMLButtonElement>('button')
          if (!nodes?.length) return
          const first = nodes[0], last = nodes[nodes.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
        }
      }}>
        <div className="relative flex min-h-[34vh] items-center justify-center overflow-hidden bg-[#e9dfcb] p-6 md:min-h-[65vh]">
          <Image src={art.image} alt={art.title} width={art.imgW || 800} height={art.imgH || 800} unoptimized className="h-auto max-h-[65dvh] w-auto max-w-full object-contain" style={{filter:negative?'invert(1)':undefined}} />
        </div>
        <div className="flex flex-col p-6 sm:p-9">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#846240]">Original artwork · {art.year}</p>
            <button ref={close} type="button" onClick={onClose} aria-label="Close artwork" className="rounded-full border border-[#baa58b]/50 px-3 py-1.5 text-sm">✕</button>
          </div>
          <h2 id="museum-art-title" className="mt-5 font-serif text-3xl leading-tight text-[#302b34]">{art.title}</h2>
          {art.movie ? <p className="mt-2 text-xs text-[#846240]">{art.movie}</p> : null}
          <p className="mt-5 text-sm leading-7 text-[#695e67]">{art.description}</p>
          {isNegative ? <button type="button" aria-pressed={negative} onClick={() => setNegative(v => !v)} className="mt-6 self-start rounded-full border border-[#8960a3]/40 bg-[#eee3f0] px-4 py-2 text-xs text-[#633c78]">Negative filter: {negative ? 'on' : 'off'} · Switch view</button> : null}
          <div className="mt-8 flex items-center justify-between border-t border-[#baa58b]/30 pt-5">
            <span className="font-serif text-lg italic text-[#846240]">signedbyMMS</span>
            {hasSiblings ? <div className="flex gap-2"><button type="button" onClick={onPrev} aria-label="Previous artwork" className="rounded-full border border-[#baa58b]/50 px-4 py-2">←</button><button type="button" onClick={onNext} aria-label="Next artwork" className="rounded-full border border-[#baa58b]/50 px-4 py-2">→</button></div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
