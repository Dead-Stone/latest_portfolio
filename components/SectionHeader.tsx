'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion, useTypewriter } from '@/lib/motion'

type SectionHeaderProps = {
  label: string
  watermark: string
  watermarkClassName?: string
  labelClassName?: string
  animate?: boolean
}

export default function SectionHeader({
  label,
  watermark,
  watermarkClassName = 'text-zinc-200 dark:text-zinc-800/60',
  labelClassName = 'text-violet-600 dark:text-violet-400',
  animate = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldAnimate = animate && !reducedMotion
  const { displayed, done } = useTypewriter(label, inView && animate, reducedMotion)

  const labelEl = shouldAnimate ? (
    <p className={`section-label relative ${labelClassName}`} aria-label={label}>
      <span aria-hidden className="invisible select-none">
        {label}
      </span>
      <span aria-hidden className="absolute left-0 top-0 whitespace-pre">
        {displayed}
        {!done && <span className="section-label-caret">|</span>}
      </span>
    </p>
  ) : (
    <p className={`section-label ${labelClassName}`}>{label}</p>
  )

  return (
    <div ref={ref} className="section-header">
      {labelEl}
      <motion.p
        className={`section-watermark ${watermarkClassName}`}
        aria-hidden
        initial={false}
        animate={{
          opacity: shouldAnimate ? (done ? 1 : 0.45) : 1,
          y: shouldAnimate ? (done ? 0 : 4) : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {watermark}
      </motion.p>
    </div>
  )
}
