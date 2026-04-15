'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { experiences } from '@/data/experiences'

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="relative py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-gradient-to-br from-white via-violet-50/30 to-white dark:bg-zinc-950 dark:bg-none border-t border-violet-100 dark:border-zinc-800">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-100/30 dark:bg-violet-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Watermark + label */}
        <div className="relative mb-16 h-28 select-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-0 -left-1 font-caveat text-violet-600 dark:text-violet-400 text-2xl z-10 pointer-events-none"
          >
            where I&apos;ve worked
          </motion.p>
          <span className="absolute top-[0.5rem] left-0 text-[7rem] font-black text-zinc-200 dark:text-zinc-800/60 leading-none tracking-tighter pointer-events-none">
            EXPERIENCE
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Gradient line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-400 via-violet-300/40 to-transparent dark:from-violet-500 dark:via-violet-700/30 dark:to-transparent" />

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative pl-20 pb-14 last:pb-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Logo on timeline */}
                <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-violet-400 dark:group-hover:border-violet-500 transition-colors duration-300 flex items-center justify-center overflow-hidden shadow-sm z-10">
                  {exp.logo ? (
                    <Image src={exp.logo} alt={exp.company} width={36} height={36} className="object-contain p-1" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-violet-400" />
                  )}
                </div>

                {/* Connector dot glow on hover */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-violet-400/0 group-hover:bg-violet-400/10 transition-all duration-300 blur-sm" />

                {/* Content */}
                <div className="group-hover:translate-x-1 transition-transform duration-300">

                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap mb-1">
                        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
                          {exp.role}
                        </h3>
                        {index === 0 && (
                          <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">
                            · Now
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-400">{exp.company}</span>
                        <span className="text-zinc-400 dark:text-zinc-700">·</span>
                        <span className="text-xs text-zinc-600 dark:text-zinc-600">{exp.location}</span>
                      </div>
                    </div>
                    <span className="flex-shrink-0 whitespace-nowrap pt-0.5 text-xs font-mono text-zinc-600 dark:text-zinc-500">
                      {exp.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/60 mb-4 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/30 transition-colors duration-300" />

                  {/* Description */}
                  <ul className="space-y-2.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
                        <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-violet-300 dark:bg-violet-700" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Animated logo watermark: slides in from right on hover */}
                  {exp.logo && (
                    <motion.div
                      initial={{ x: 48, opacity: 0, scale: 0.92 }}
                      animate={
                        hoveredIndex === index
                          ? { x: 0, opacity: 0.18, scale: 1 }
                          : { x: 48, opacity: 0, scale: 0.92 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-52 h-52 pointer-events-none select-none [filter:sepia(1)_saturate(2)_hue-rotate(240deg)] dark:[filter:invert(1)_sepia(1)_saturate(2)_hue-rotate(240deg)]"
                    >
                      <Image src={exp.logo} alt="" fill className="object-contain" />
                    </motion.div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
