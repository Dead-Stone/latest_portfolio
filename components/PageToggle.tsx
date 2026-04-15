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
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 overflow-hidden transition-all duration-300 ${
        isArtPage
          ? 'bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900'
          : 'bg-violet-600 dark:bg-violet-500 text-white'
      }`}
      style={{ touchAction: 'manipulation' }}
      aria-label={isArtPage ? 'Go to Portfolio' : 'Go to Art World'}
    >
      <motion.div
        className="flex items-center gap-2 px-4 py-3"
        animate={{ width: hovered ? 'auto' : 'auto' }}
      >
        {isArtPage ? <MdCode size={18} /> : <MdPalette size={18} />}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {isArtPage ? 'Portfolio' : 'Art World'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
