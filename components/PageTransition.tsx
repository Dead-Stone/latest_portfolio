'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { usePathname } from 'next/navigation'
import { FaCode, FaPalette } from 'react-icons/fa'

export default function PageTransition() {
  const { isTransitioning } = usePageTransition()
  const pathname = usePathname()
  const isArtPage = pathname === '/art'

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ originY: 0 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 dark:from-purple-700 dark:via-pink-700 dark:to-blue-700 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            {isArtPage ? (
              <>
                <FaCode className="text-6xl text-white" />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-xl font-semibold"
                >
                  Loading Portfolio...
                </motion.p>
              </>
            ) : (
              <>
                <FaPalette className="text-6xl text-white" />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-xl font-semibold"
                >
                  Loading Art Gallery...
                </motion.p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

