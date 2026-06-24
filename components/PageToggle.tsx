'use client'

import { usePathname, useRouter } from 'next/navigation'
import { MdCode, MdPalette } from 'react-icons/md'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageToggle() {
  const pathname = usePathname()
  const router = useRouter()
  const isArtPage = pathname === '/art'
  const { startTransition, endTransition } = usePageTransition()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    endTransition()
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    if (window.innerWidth < 768) window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const toggle = () => {
    startTransition()
    setTimeout(() => router.push(isArtPage ? '/' : '/art'), 200)
  }

  return (
    <motion.button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className={`fixed z-50 flex items-center justify-center rounded-full shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 overflow-hidden transition-all duration-300 right-4 sm:right-6 sm:min-h-[48px] sm:shadow-lg h-10 w-10 sm:h-auto sm:w-auto ${
        isArtPage
          ? 'bg-zinc-900/95 dark:bg-zinc-50/95 text-zinc-50 dark:text-zinc-900'
          : 'bg-violet-600/95 dark:bg-violet-500/95 text-white'
      }`}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', touchAction: 'manipulation' }}
      aria-label={isArtPage ? 'Go to Portfolio' : 'Go to Art World'}
    >
      <motion.div className="flex items-center justify-center gap-2 sm:px-4 sm:py-3">
        {isArtPage ? (
          <MdCode className="h-[15px] w-[15px] sm:h-[18px] sm:w-[18px]" />
        ) : (
          <MdPalette className="h-[15px] w-[15px] sm:h-[18px] sm:w-[18px]" />
        )}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:inline text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {isArtPage ? 'Portfolio' : 'Art World'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
