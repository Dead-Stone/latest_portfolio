'use client'

import { useEffect, useRef } from 'react'

export default function MohanWelcome({onEnter}:{onEnter:()=>void}) {
  const enter=useRef<HTMLButtonElement>(null)
  useEffect(()=>{enter.current?.focus()},[])
  return <div className="absolute inset-0 z-30 flex items-end justify-center bg-[#181722]/45 px-4 pb-16 pt-24">
    <section role="dialog" aria-modal="true" aria-labelledby="mohan-welcome-title" aria-describedby="mohan-welcome-copy" className="w-full max-w-2xl max-h-[calc(100dvh-160px)] overflow-y-auto rounded-xl border-2 border-[#baa58b] bg-[#fffaf0] p-5 shadow-2xl sm:p-7" onKeyDown={event=>{
      if(event.key==='Tab'){event.preventDefault();enter.current?.focus()}
    }}>
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-xl border border-[#baa58b]/40 bg-[#e9dfcb]" aria-hidden="true"><div style={{width:96,height:96,backgroundImage:'url(/game/character.png)',backgroundSize:'384px 384px',backgroundPosition:'0 0',backgroundRepeat:'no-repeat',imageRendering:'pixelated'}} /></div>
        <div><p className="inline-block rounded-md bg-[#302b34] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[#fff3dc]">MOHAN</p><h2 id="mohan-welcome-title" className="mt-2 font-serif text-3xl text-[#302b34]">Hey, I’m Mohan.</h2><p className="mt-1 text-sm text-[#846240]">Welcome to my little art world.</p></div>
      </div>
      <div id="mohan-welcome-copy" className="mt-6 space-y-4 text-sm leading-7 text-[#695e67]">
        <p>Come on in! I’ll show you around the faces, characters, and moments I’ve drawn—from Jim Carrey’s wild expressions to anime, basketball, and my premium collection.</p>
        <p>Walk with me along the gold trail. When we get close to a drawing, its preview will pop up. Click it or press E whenever you’d like to see the original.</p>
        <p>Click an open spot or use the arrow keys to move. If you need your bearings, open the floor plan. Take your time—I’m glad you’re here.</p>
      </div>
      <button ref={enter} type="button" onClick={onEnter} className="mt-6 w-full rounded-lg bg-[#302b34] px-6 py-3 text-sm text-[#fff3dc] transition hover:bg-[#514854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8960a3]">Let’s explore →</button>
    </section>
  </div>
}
