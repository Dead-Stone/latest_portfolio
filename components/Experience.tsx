'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { experiences } from '@/data/experiences'
import SectionHeader from '@/components/SectionHeader'

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-10 lg:px-16 overflow-hidden bg-gradient-to-br from-white via-violet-50/30 to-white dark:bg-zinc-950 dark:bg-none border-t border-violet-100 dark:border-zinc-800">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-100/30 dark:bg-violet-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Watermark + label */}
        <SectionHeader label="where I've worked" watermark="EXPERIENCE" animate />

        {/* Timeline */}
        <div className="relative">

          {/* Gradient line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-400 via-violet-300/40 to-transparent dark:from-violet-500 dark:via-violet-700/30 dark:to-transparent" />

          <div className="space-y-0">
            {experiences.map((exp, index) => {
              const isHovered = hoveredIndex === index
              const fillTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }

              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative pl-16 sm:pl-20 pb-6 sm:pb-8 last:pb-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative py-3 pr-8 pb-4 sm:pr-12 sm:pb-5 [--exp-timeline:4rem] sm:[--exp-timeline:5rem]">
                {/* Unified circle → card on timeline */}
                <motion.div
                  className="absolute -left-16 top-0 z-0 overflow-hidden border-0 bg-white/20 shadow-[0_12px_40px_-10px_rgba(124,58,237,0.28),0_4px_20px_-6px_rgba(0,0,0,0.35)] backdrop-blur-3xl dark:bg-white/[0.1] dark:shadow-[0_12px_48px_-10px_rgba(124,58,237,0.35),0_8px_24px_-8px_rgba(0,0,0,0.55)] sm:-left-20"
                  initial={false}
                  animate={
                    isHovered
                      ? { width: 'calc(100% + var(--exp-timeline))', height: '100%', borderRadius: 24 }
                      : { width: 48, height: 48, borderRadius: 24 }
                  }
                  transition={fillTransition}
                >
                  {/* White logo circle — always visible */}
                  <motion.div
                    animate={{
                      boxShadow: isHovered
                        ? '0 0 10px 3px rgba(255,255,255,0.6), 0 0 18px 6px rgba(255,255,255,0.32), 0 0 26px 9px rgba(255,255,255,0.12)'
                        : '0 2px 10px rgba(0,0,0,0.08)',
                    }}
                    transition={fillTransition}
                    className="absolute left-0 top-0 z-[1] h-12 w-12 rounded-full bg-white"
                  />

                  {/* White glow ring — radiates outward from circle edge */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={fillTransition}
                    className="pointer-events-none absolute inset-0 z-[2]"
                    style={{
                      background:
                        'radial-gradient(circle 4.25rem at 1.5rem 1.5rem, transparent 0px, transparent 22px, rgba(255,255,255,0.65) 24px, rgba(255,255,255,0.38) 30px, rgba(255,255,255,0.16) 38px, transparent 50px)',
                    }}
                    aria-hidden
                  />

                  {/* Shadow bloom from circle into rectangle */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={fillTransition}
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      background:
                        'radial-gradient(circle 8rem at 1.5rem 1.5rem, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.08) 18%, rgba(124,58,237,0.1) 32%, rgba(0,0,0,0.04) 48%, transparent 68%)',
                    }}
                    aria-hidden
                  />
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={fillTransition}
                    className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-violet-100/15 via-transparent to-violet-200/10 dark:from-violet-500/[0.05] dark:to-violet-950/20"
                    aria-hidden
                  />
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={fillTransition}
                    className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tl from-transparent via-transparent to-black/[0.04] dark:to-black/[0.14]"
                    aria-hidden
                  />
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={fillTransition}
                    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/35"
                    aria-hidden
                  />

                  {exp.logo && (
                    <motion.div
                      initial={false}
                      animate={{ x: isHovered ? 0 : 48, opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.92 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-4 bottom-4 z-0 hidden h-[10.5rem] w-[10.5rem] pointer-events-none select-none sm:block sm:right-5 sm:bottom-5 sm:h-48 sm:w-48"
                    >
                      <div className="relative h-full w-full opacity-[0.22]">
                        <div className="absolute inset-1 sm:inset-1.5">
                          <Image src={exp.logo} alt="" fill className="object-contain object-[right_bottom]" sizes="192px" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Logo fixed in circle — inset accounts for border */}
                <div className="pointer-events-none absolute -left-16 top-0 z-10 h-12 w-12 sm:-left-20">
                  <div className="absolute inset-[2px] flex items-center justify-center overflow-hidden rounded-full p-0.5">
                    {exp.logo ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          className="object-contain object-center"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-violet-700 dark:bg-violet-600" />
                    )}
                  </div>
                </div>

                {/* Connector dot glow on hover */}
                <div className="pointer-events-none absolute -left-16 top-0 z-[1] h-12 w-12 rounded-full bg-violet-400/0 blur-sm transition-all duration-300 group-hover:bg-violet-400/10 sm:-left-20" />

                {/* Content */}
                <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">

                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap mb-1">
                        <h3 className="text-xl font-extrabold tracking-tight leading-none text-zinc-900 dark:text-white">
                          {exp.role}
                        </h3>
                        {index === 0 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            · Now
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{exp.company}</span>
                        <span className="text-zinc-400 dark:text-zinc-600">·</span>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400">{exp.location}</span>
                      </div>
                    </div>
                    <span className="flex-shrink-0 whitespace-nowrap pt-0.5 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                      {exp.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={`mb-4 h-px w-full transition-colors duration-300 ${
                    isHovered
                      ? 'bg-gradient-to-r from-violet-400/50 via-violet-300/25 to-transparent dark:from-violet-500/40 dark:via-violet-600/20'
                      : 'bg-zinc-100 dark:bg-zinc-800/60'
                  }`} />

                  {/* Description */}
                  <ul className="space-y-2.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <span className="mt-2 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 shadow-[0_0_6px_rgba(124,58,237,0.45)] dark:from-violet-400 dark:to-violet-600" />
                        {item}
                      </li>
                    ))}
                  </ul>

                </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
