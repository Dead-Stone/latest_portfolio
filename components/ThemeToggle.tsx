'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 p-1">
        <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === 'dark' ? (
          <FaMoon className="text-gray-800 text-xs" />
        ) : (
          <FaSun className="text-yellow-500 text-xs" />
        )}
      </motion.div>
    </motion.button>
  )
}

