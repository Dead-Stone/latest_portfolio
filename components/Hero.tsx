'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/lib/motion'

const roles = ['Software Engineer', 'AI Engineer', 'Full-Stack Developer', 'Founding Engineer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [reducedMotion])

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center px-4 sm:px-10 lg:px-16 bg-white dark:bg-[#07060b] overflow-hidden"
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055] dark:opacity-[0.11]"
        style={{
          backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Dark mode base wash */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block bg-gradient-to-br from-[#0c0a12] via-[#07060b] to-[#0a0610]" />

      {/* Atmospheric glow layers */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,rgba(124,58,237,0.14)_0%,transparent_55%)]" />
      <div className="absolute inset-0 pointer-events-none hidden dark:block bg-[radial-gradient(ellipse_50%_45%_at_85%_25%,rgba(236,72,153,0.09)_0%,transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none hidden dark:block bg-[radial-gradient(ellipse_45%_40%_at_15%_70%,rgba(99,102,241,0.08)_0%,transparent_50%)]" />

      {/* Radial fade mask over dot grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,white_100%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_25%,#07060b_88%)]" />

      {/* Glow blobs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-violet-300/40 dark:bg-violet-600/18 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-200/30 dark:bg-fuchsia-600/12 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] rounded-full bg-indigo-500/0 dark:bg-indigo-500/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent dark:via-violet-500/35" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent dark:via-violet-500/20" />

      <div className="max-w-6xl mx-auto w-full pt-16 sm:pt-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-20">

          {/* ── Text column ── */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">



            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-caveat text-violet-500 dark:text-violet-400 text-2xl mb-2"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3"
            >
              <h1 className="text-[2rem] leading-[1.1] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Mohana Moganti
              </h1>
            </motion.div>

            {/* Cycling role: typewriter style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="min-h-8 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-0 lg:justify-start mb-6 sm:mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-lg font-medium text-violet-600 dark:text-violet-400 text-center lg:text-left"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="hidden sm:block mx-4 w-px h-4 bg-zinc-300 dark:bg-zinc-700 self-center" />
              <span className="text-sm text-zinc-600 sm:text-lg dark:text-zinc-500">San Jose, CA</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6 sm:mb-8"
            >
              <a
                href="#contact"
                className="group min-h-[44px] px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-lg shadow-violet-200 dark:shadow-violet-900/30 hover:shadow-violet-300 dark:hover:shadow-violet-900/50 hover:-translate-y-0.5 inline-flex items-center justify-center"
              >
                Get in Touch
              </a>
              <a
                href="/Resume_Latest_103025.pdf"
                download="Mohana_Moganti_Resume.pdf"
                className="min-h-[44px] px-6 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-semibold hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 inline-flex items-center justify-center"
              >
                Download CV
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.88 }}
              className="flex gap-3 justify-center lg:justify-start"
            >
              <a
                href="https://www.linkedin.com/in/mohana-moganti/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:bg-violet-100 hover:text-violet-700 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-violet-900/40 dark:hover:text-violet-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="https://github.com/Dead-Stone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
            </motion.div>
          </div>

          {/* ── Photo column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 order-1 lg:order-2 flex flex-col items-center gap-6"
          >
            {/* Float wrapper */}
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
              transition={reducedMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-violet-400/30 via-pink-400/20 to-violet-400/10 dark:from-violet-600/20 dark:via-pink-600/15 dark:to-violet-600/10 blur-2xl pointer-events-none" />

              {/* Ring container */}
              <div className="relative w-44 h-44 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px]">
                {/* Spinning conic gradient ring */}
                <motion.div
                  animate={reducedMotion ? undefined : { rotate: 360 }}
                  transition={reducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full p-[3px]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #7c3aed 0%, #a855f7 25%, #ec4899 50%, #f59e0b 70%, #7c3aed 100%)',
                    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                  }}
                />

                {/* White/dark gap ring */}
                <div className="absolute inset-[3px] rounded-full bg-white dark:bg-[#07060b]" />

                {/* Photo */}
                <div className="absolute inset-[6px] rounded-full overflow-hidden ring-1 ring-zinc-100/50 dark:ring-zinc-800/50">
                  <Image
                    src="/mohana-pixel.jpeg"
                    alt="Mohana Moganti"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 300px"
                    priority
                  />
                </div>
              </div>

            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.a
          href="#about"
          animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={reducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-700 dark:hover:text-zinc-400"
        >
          <span className="text-[10px] tracking-widest uppercase">scroll</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  )
}
