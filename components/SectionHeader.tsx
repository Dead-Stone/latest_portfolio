'use client'

import { motion } from 'framer-motion'

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
  const labelEl = animate ? (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`section-label ${labelClassName}`}
    >
      {label}
    </motion.p>
  ) : (
    <p className={`section-label ${labelClassName}`}>{label}</p>
  )

  return (
    <div className="section-header">
      {labelEl}
      <p className={`section-watermark ${watermarkClassName}`} aria-hidden>
        {watermark}
      </p>
    </div>
  )
}
