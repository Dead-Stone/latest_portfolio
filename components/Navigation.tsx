'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MdPalette } from 'react-icons/md'
import ThemeToggle from './ThemeToggle'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { useRouter } from 'next/navigation'
import { scrollToSection } from '@/lib/scroll'

interface NavigationProps {
  activeSection: string
  showGallery?: boolean
}

interface NavItem {
  id: string
  label: string
}

const baseNavItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Research' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation({ activeSection, showGallery = false }: NavigationProps) {
  const navItems = showGallery ? baseNavItems : baseNavItems.filter(item => item.id !== 'gallery')
  const [isScrolled, setIsScrolled] = useState(false)
  const { startTransition } = usePageTransition()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goToArt = () => {
    startTransition()
    setTimeout(() => router.push('/art'), 200)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900'
          : 'bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md md:bg-transparent md:backdrop-blur-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-16 safe-top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex shrink-0 items-center hover:opacity-70 transition-opacity"
          >
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <Image
                src="/logo.png"
                alt="Mohana Moganti"
                width={110}
                height={55}
                className="h-30 w-auto object-contain dark:invert dark:brightness-0 dark:contrast-200"
                priority
              />
            </motion.div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-colors relative pb-0.5 ${
                  activeSection === item.id
                    ? 'text-zinc-900 dark:text-zinc-50 font-medium'
                    : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-violet-500 dark:bg-violet-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Art World link */}
            <button
              onClick={goToArt}
              className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 font-medium transition-colors ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-6"
            >
              <MdPalette size={15} />
              Art World
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile: theme + menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <MobileMenu navItems={navItems} scrollToSection={scrollToSection} goToArt={goToArt} />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function MobileMenu({
  navItems,
  scrollToSection,
  goToArt,
}: {
  navItems: NavItem[]
  scrollToSection: (id: string) => void
  goToArt: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none dark:text-zinc-300 dark:hover:bg-white/[0.06]"
        aria-label="Toggle menu"
      >
        <svg className="h-[18px] w-[18px]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        className="absolute top-14 left-0 right-0 max-h-[calc(100dvh-3.5rem)] overflow-y-auto bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 shadow-lg sm:top-16"
        >
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollToSection(item.id); setIsOpen(false) }}
                className="block w-full text-left px-3 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { goToArt(); setIsOpen(false) }}
              className="flex items-center gap-2 w-full text-left px-3 py-3 text-sm text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-lg transition-colors font-medium mt-1 border-t border-zinc-100 dark:border-zinc-900 pt-3"
            >
              <MdPalette size={15} /> Art World
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
