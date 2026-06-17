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

/** Framer Motion props that respect prefers-reduced-motion */
export function motionSafe(
  reduced: boolean,
  animated: Record<string, unknown>,
  fallback: Record<string, unknown> = { initial: false, animate: undefined, transition: { duration: 0 } },
) {
  return reduced ? fallback : animated
}
