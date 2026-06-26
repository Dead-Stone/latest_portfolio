'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return coarse
}

export function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return mobile
}

/** Types text in when `start` becomes true; instant when reduced motion is on. */
export function useTypewriter(text: string, start: boolean, reduced: boolean) {
  const [displayed, setDisplayed] = useState(reduced ? text : '')
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (!start) return

    if (reduced) {
      setDisplayed(text)
      setDone(true)
      return
    }

    setDisplayed('')
    setDone(false)

    let index = 0
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        setDone(true)
        return
      }
      const char = text[index - 1]
      const delay =
        char === ' '
          ? 30
          : /[.,'!?—–]/.test(char)
            ? 130
            : 38 + Math.round(Math.random() * 32)
      timeout = setTimeout(tick, delay)
    }

    timeout = setTimeout(tick, 160)
    return () => clearTimeout(timeout)
  }, [text, start, reduced])

  return { displayed, done }
}

/** Framer Motion props that respect prefers-reduced-motion */
export function motionSafe(
  reduced: boolean,
  animated: Record<string, unknown>,
  fallback: Record<string, unknown> = { initial: false, animate: undefined, transition: { duration: 0 } },
) {
  return reduced ? fallback : animated
}
