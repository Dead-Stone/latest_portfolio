'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaChevronDown } from 'react-icons/fa'
import { experiences } from '@/data/experiences'
import SectionHeader from '@/components/SectionHeader'
import { useTheme } from '@/contexts/ThemeContext'
import { useCoarsePointer, useIsMobile } from '@/lib/motion'

const LOGO_SURFACE_RGB = {
  light: '255, 255, 255',
  dark: '235, 230, 220',
} as const

const VIOLET_RGB = '124, 58, 237'

const LOGO_SIZE_MOBILE = 32
const LOGO_SIZE_DESKTOP = 48

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const isMobile = useIsMobile()
  const coarsePointer = useCoarsePointer()
  const collapsible = isMobile || coarsePointer
  const { theme } = useTheme()

  const toggleExpanded = (index: number) => {
    setExpandedIndex(current => (current === index ? null : index))
  }

  return (
    <section
      id="experience"
      className="section-shell bg-gradient-to-br from-white via-violet-50/30 to-white dark:bg-zinc-950 dark:bg-none max-sm:py-10"
    >
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-100/30 dark:bg-violet-900/10 blur-[120px] pointer-events-none" />

      <div className="section-inner max-sm:pb-16">
        <div className="max-sm:mb-6 sm:mb-0">
          <SectionHeader label="where I've worked" watermark="EXPERIENCE" animate />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-violet-400 via-violet-300/40 to-transparent dark:from-violet-500 dark:via-violet-700/30 dark:to-transparent sm:left-6" />

          <div className="space-y-0">
            {experiences.map((exp, index) => {
              const isHovered = !collapsible && hoveredIndex === index
              const isExpanded = collapsible ? expandedIndex === index : true
              const showDescription = isExpanded
              const fillTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
              const surface = theme === 'dark' ? LOGO_SURFACE_RGB.dark : LOGO_SURFACE_RGB.light
              const expandedLogoShadow = `0 0 0 1px rgba(${surface}, 0.55), 0 0 5px 4px rgba(${surface}, 0.5), 0 0 14px 10px rgba(${surface}, 0.38), 0 0 28px 18px rgba(${surface}, 0.24)`
              const collapsedLogoShadow = `0 2px 10px rgba(${surface}, ${theme === 'dark' ? 0.38 : 0.45})`
              const expandedCardShadow = `2px 6px 18px -4px rgba(${VIOLET_RGB}, ${theme === 'dark' ? 0.52 : 0.34}), 4px 14px 36px -6px rgba(${VIOLET_RGB}, ${theme === 'dark' ? 0.36 : 0.22})`
              const collapsedCardShadow = `0 3px 12px -2px rgba(${VIOLET_RGB}, ${theme === 'dark' ? 0.3 : 0.18})`
              const circleBloom = `radial-gradient(circle 14rem at 1.5rem 1.5rem, transparent 0px, transparent 21px, rgba(${surface}, 0.68) 22px, rgba(${surface}, 0.52) 30px, rgba(${surface}, 0.36) 44px, rgba(${surface}, 0.2) 64px, rgba(${surface}, 0.08) 88px, transparent 100%)`

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative pl-8 pb-3 last:pb-0 sm:pl-20 sm:pb-8"
                  onMouseEnter={() => !collapsible && setHoveredIndex(index)}
                  onMouseLeave={() => !collapsible && setHoveredIndex(null)}
                >
                  <div className="relative pr-0.5 sm:py-3 sm:pr-12 sm:pb-5 [--exp-timeline:2rem] sm:[--exp-timeline:5rem]">
                    <motion.div
                      className="absolute -left-8 top-0 z-0 overflow-hidden border-0 bg-white/20 backdrop-blur-3xl dark:bg-white/[0.1] sm:-left-20"
                      initial={false}
                      animate={
                        isHovered
                          ? {
                              width: 'calc(100% + var(--exp-timeline))',
                              height: '100%',
                              borderRadius: 24,
                              boxShadow: expandedCardShadow,
                            }
                          : {
                              width: isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP,
                              height: isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP,
                              borderRadius: isMobile ? 16 : 24,
                              boxShadow: collapsedCardShadow,
                            }
                      }
                      transition={fillTransition}
                    >
                      <motion.div
                        animate={{
                          boxShadow: isHovered ? expandedLogoShadow : collapsedLogoShadow,
                        }}
                        transition={fillTransition}
                        className="absolute left-0 top-0 z-[1] h-8 w-8 rounded-full bg-white dark:bg-[#ebe6dc] sm:h-12 sm:w-12"
                      />

                      <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={fillTransition}
                        className="pointer-events-none absolute inset-0 z-0"
                        style={{ background: circleBloom }}
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
                        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tl from-transparent via-transparent to-violet-900/[0.06] dark:to-violet-950/25"
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

                    <div className="pointer-events-none absolute -left-8 top-0 z-10 h-8 w-8 sm:-left-20 sm:h-12 sm:w-12">
                      <div className="absolute inset-[2px] flex items-center justify-center overflow-hidden rounded-full bg-white p-0.5 dark:bg-[#ebe6dc]">
                        {exp.logo ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              fill
                              className="object-contain object-center"
                              sizes="36px"
                            />
                          </div>
                        ) : (
                          <div className="h-2.5 w-2.5 rounded-full bg-violet-700 dark:bg-violet-600" />
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 sm:transition-transform sm:duration-300 sm:group-hover:translate-x-1">
                      <button
                        type="button"
                        className={`w-full text-left ${collapsible ? 'cursor-pointer touch-manipulation' : 'cursor-default'}`}
                        onClick={() => collapsible && toggleExpanded(index)}
                        aria-expanded={collapsible ? isExpanded : undefined}
                      >
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                              <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl sm:font-extrabold">
                                {exp.role}
                              </h3>
                              {index === 0 && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 sm:text-[10px]">
                                  Now
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs leading-snug text-zinc-600 dark:text-zinc-400 sm:mt-1 sm:text-sm sm:text-zinc-700 dark:sm:text-zinc-300">
                              <span className="font-medium text-zinc-700 dark:text-zinc-300">{exp.company}</span>
                              <span className="text-zinc-400 dark:text-zinc-600"> · </span>
                              {exp.location}
                            </p>
                            <p className="mt-0.5 text-[11px] font-mono leading-tight text-zinc-500 dark:text-zinc-500 sm:text-xs sm:text-zinc-600 dark:sm:text-zinc-400">
                              {exp.period}
                            </p>
                            {collapsible && !isExpanded && (
                              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-violet-500/75 dark:text-violet-400/65">
                                Tap for details
                              </p>
                            )}
                          </div>
                          {collapsible && (
                            <FaChevronDown
                              size={10}
                              className={`mt-0.5 flex-shrink-0 text-violet-500 transition-transform duration-200 dark:text-violet-400 sm:mt-1 sm:h-3 sm:w-3 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                              aria-hidden
                            />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {showDescription && (
                          <motion.div
                            key="description"
                            initial={collapsible ? { opacity: 0 } : false}
                            animate={{ opacity: 1 }}
                            exit={collapsible ? { opacity: 0 } : undefined}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="max-sm:pt-3 sm:overflow-hidden sm:pt-0"
                          >
                            <div
                              className={`mb-1 mt-1.5 hidden h-px w-full sm:mb-3 sm:mt-2.5 sm:block ${
                                isHovered
                                  ? 'bg-gradient-to-r from-violet-400/50 via-violet-300/25 to-transparent dark:from-violet-500/40 dark:via-violet-600/20'
                                  : 'bg-zinc-100 dark:bg-zinc-800/60'
                              }`}
                            />
                            <ul className="max-sm:-ml-5 max-sm:mt-1 max-sm:w-[calc(100%+1.25rem)] max-sm:space-y-2.5 sm:space-y-2">
                              {exp.description.map((item, i) => (
                                <li
                                  key={i}
                                  className="relative text-xs leading-[1.45] text-zinc-600 dark:text-zinc-400 max-sm:grid max-sm:grid-cols-[0_minmax(0,1fr)] max-sm:gap-x-2 max-sm:items-start sm:flex sm:gap-2 sm:text-xs sm:leading-snug sm:text-zinc-700 dark:sm:text-zinc-300"
                                >
                                  <div className="relative w-0 max-sm:block sm:hidden">
                                    <span
                                      className="absolute left-0 top-[0.52rem] z-20 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-600 ring-[1px] ring-white dark:bg-violet-400 dark:ring-zinc-950"
                                      aria-hidden
                                    />
                                  </div>
                                  <span
                                    className="mt-1.5 hidden h-1 w-1 flex-shrink-0 rounded-full bg-violet-500 shadow-[0_0_6px_rgba(124,58,237,0.45)] dark:bg-violet-400 sm:mt-2 sm:block"
                                    aria-hidden
                                  />
                                  <span className="min-w-0">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
