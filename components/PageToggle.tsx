'use client'

import { usePathname, useRouter } from 'next/navigation'
import { FaCode, FaPalette } from 'react-icons/fa'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { useEffect } from 'react'

export default function PageToggle() {
  const pathname = usePathname()
  const router = useRouter()
  const isArtPage = pathname === '/art'
  const { startTransition, endTransition } = usePageTransition()

  useEffect(() => {
    // End transition when pathname changes
    endTransition()
    // Always restore scroll when pathname changes (important for art page)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    
    // Reset scroll position on mobile when page changes
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const togglePage = () => {
    startTransition()
    // Small delay to show the transition, then navigate
    setTimeout(() => {
      if (isArtPage) {
        router.push('/')
      } else {
        router.push('/art')
      }
    }, 200)
  }

  return (
    <button
      onClick={togglePage}
      className="fixed bottom-6 right-6 z-50 w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 touch-none"
      style={{ touchAction: 'manipulation' }}
      aria-label={isArtPage ? 'Go to Portfolio' : 'Go to Art Gallery'}
    >
      <div
        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${
          isArtPage ? 'left-1' : 'left-7'
        }`}
      >
        {isArtPage ? (
          <FaCode className="text-gray-800 text-xs" />
        ) : (
          <FaPalette className="text-purple-600 text-xs" />
        )}
      </div>
    </button>
  )
}

