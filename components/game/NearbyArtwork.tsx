'use client'

import Image from 'next/image'
import type { ArtPiece } from '@/data/art'
import { frameFor, framePath } from '@/lib/game/assets'

/** A non-modal proximity preview: walking away dismisses it without taking focus. */
export default function NearbyArtwork({art,onOpen}:{art:ArtPiece;onOpen:()=>void}) {
  const frame = frameFor(art)
  return <section aria-label="Nearby artwork preview" className="nearby-art absolute inset-x-3 top-24 z-10 overflow-hidden rounded-xl border border-[#88768e]/40 bg-[#fffaf0] shadow-xl sm:inset-x-auto sm:bottom-24 sm:right-5 sm:top-auto sm:w-[380px]">
    <button type="button" onClick={onOpen} aria-label={`View original: ${art.title}`} className="preview-content group grid w-full grid-cols-[88px_1fr] items-center gap-4 overflow-y-auto p-4 text-left transition hover:bg-[#eee3f0]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#8960a3] sm:grid-cols-[112px_1fr] sm:p-5">
      <span className="flex items-center justify-center rounded bg-[#e9dfcb] p-1" style={frame.original?{border:'4px solid #705741',padding:4,background:'#fff3dc'}:undefined}>
        <Image src={framePath(art)} alt={art.title} width={frame.width} height={frame.height} unoptimized className="h-auto max-w-full" style={{imageRendering:'pixelated'}} />
      </span>
      <span className="block min-w-0">
        <span className="block font-serif text-lg leading-tight text-[#302b34]" aria-live="polite">{art.title}</span>
        <span className="mt-2 block line-clamp-3 text-xs leading-5 text-[#695e67]">{art.description}</span>
        <span className="mt-2 block text-[11px] font-medium text-[#633c78]">Take a closer look ↗ <span className="ml-1 hidden rounded border border-[#8960a3]/40 px-1 font-mono sm:inline">E</span></span>
      </span>
    </button>
    <style jsx>{`
      .preview-content { max-height:min(320px, calc(100dvh - 200px)); }
      .nearby-art { animation:preview-in 180ms ease-out; }
      @keyframes preview-in { from { opacity:0; } to { opacity:1; } }
      @media(prefers-reduced-motion:reduce) { .nearby-art { animation:none; } }
    `}</style>
  </section>
}
