'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaExpand, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import ThemeToggle from '@/components/ThemeToggle'
import PageToggle from '@/components/PageToggle'

interface ArtPiece {
  id: number
  title: string
  description: string
  image: string
  negativeImage?: string
  category: string
  year: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
  hasNegative?: boolean
  sequence?: string[] // optional sequence of frames for GIF-like playback
  sequenceIntervalMs?: number // interval between frames
}

const artPieces: ArtPiece[] = [
  // Animated sequence from c1–c9
  {
    id: 0,
    title: 'Jim Carrey',
    description: 'Jim Carrey as The Mask is pure chaos in the best way possible. That green face, those wild expressions, the way he could stretch reality itself with just a look. But honestly, what really got me was The Truman Show. That movie hit me in a way I still can\'t fully explain. Watching Truman discover his entire life was a lie, seeing him break free from that perfect little world, it made me think about my own reality in ways no other movie has. The way Carrey played both characters, the over-the-top energy of The Mask and the quiet desperation of Truman, showed his incredible range. I loved The Truman Show till date, and I think about it whenever I question what\'s real and what\'s just part of the show.',
    image: '/art/c1.png',
    category: 'Animation',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: false,
    sequence: [
      '/art/c1.png',
      '/art/c2.png',
      '/art/c3.png',
      '/art/c4.png',
      '/art/c5.png',
      '/art/c6.png',
      '/art/c7.png',
      '/art/c8.png',
      '/art/c9.png',
    ],
    sequenceIntervalMs: 250,
  },
  {
    id: 1,
    title: 'Jack Nicholson',
    description: 'There\'s something magnetic about the Joker that keeps drawing me back. Jack Nicholson\'s version was the first I saw, that manic laugh and theatrical chaos that made him both terrifying and oddly charming. Then Heath Ledger came along and completely redefined what the character could be. His performance was so raw and unsettling that it earned him that well-deserved Oscar, and honestly, it changed how I think about villainy in cinema. But Joaquin Phoenix\'s take hit different. Watching Arthur Fleck\'s descent into madness felt uncomfortably real, like we were witnessing a person break rather than just a villain being born. Each actor brought something unique: Nicholson\'s theatricality, Ledger\'s anarchic intensity, Phoenix\'s heartbreaking vulnerability. That\'s why I\'m such a big fan; the Joker isn\'t just one character, it\'s a canvas that three incredible actors painted in completely different ways, and each one is a masterpiece.',
    image: '/art/negative-1.png',
    negativeImage: '/art/negative-1.png',
    category: 'Portrait',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 2,
    title: 'Heath Ledger',
    description: 'There\'s something magnetic about the Joker that keeps drawing me back. Jack Nicholson\'s version was the first I saw, that manic laugh and theatrical chaos that made him both terrifying and oddly charming. Then Heath Ledger came along and completely redefined what the character could be. His performance was so raw and unsettling that it earned him that well-deserved Oscar, and honestly, it changed how I think about villainy in cinema. But Joaquin Phoenix\'s take hit different. Watching Arthur Fleck\'s descent into madness felt uncomfortably real, like we were witnessing a person break rather than just a villain being born. Each actor brought something unique: Nicholson\'s theatricality, Ledger\'s anarchic intensity, Phoenix\'s heartbreaking vulnerability. That\'s why I\'m such a big fan; the Joker isn\'t just one character, it\'s a canvas that three incredible actors painted in completely different ways, and each one is a masterpiece.',
    image: '/art/negative-2.png',
    negativeImage: '/art/negative-2.png',
    category: 'Portrait',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 3,
    title: 'Joaquin Phoenix',
    description: 'There\'s something magnetic about the Joker that keeps drawing me back. Jack Nicholson\'s version was the first I saw, that manic laugh and theatrical chaos that made him both terrifying and oddly charming. Then Heath Ledger came along and completely redefined what the character could be. His performance was so raw and unsettling that it earned him that well-deserved Oscar, and honestly, it changed how I think about villainy in cinema. But Joaquin Phoenix\'s take hit different. Watching Arthur Fleck\'s descent into madness felt uncomfortably real, like we were witnessing a person break rather than just a villain being born. Each actor brought something unique: Nicholson\'s theatricality, Ledger\'s anarchic intensity, Phoenix\'s heartbreaking vulnerability. That\'s why I\'m such a big fan; the Joker isn\'t just one character, it\'s a canvas that three incredible actors painted in completely different ways, and each one is a masterpiece.',
    image: '/art/negative-3.png',
    negativeImage: '/art/negative-3.png',
    category: 'Portrait',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 5,
    title: 'Hisoka',
    description: 'Hisoka from Hunter x Hunter is one of those characters that just gets under your skin in the best way. There\'s something about his twisted charisma, that unsettling smile, and the way he treats every fight like a game that makes him impossible to look away from. He\'s dangerous, unpredictable, and completely unapologetic about who he is. The way he sees potential in people, especially Gon and Killua, and waits for them to grow stronger just so he can have a better fight, it\'s messed up but also weirdly fascinating. His Nen abilities with Bungee Gum and Texture Surprise are creative and deadly, but it\'s his personality that really makes him stand out. He\'s not trying to be evil or good, he just follows his own twisted desires, and that honesty about his nature is what makes him so compelling. He\'s the kind of character you know you shouldn\'t like, but you can\'t help being drawn to his chaotic energy.',
    image: '/art/anime-1.png',
    category: 'Anime',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 6,
    title: 'Roronoa Zoro',
    description: 'Zoro from One Piece is the definition of loyalty and determination. This guy will literally die before he breaks a promise, and that\'s not even an exaggeration. Watching him train with those insane weights, pushing himself beyond human limits, it\'s inspiring in a way that makes you want to work harder at whatever you\'re doing. His three-sword style is iconic, but it\'s his unwavering commitment to becoming the world\'s greatest swordsman that really gets me. He\'s got this quiet intensity, never backing down from a challenge, and when he says he\'ll do something, you know he means it. The way he trusts Luffy completely, even when the captain\'s plans are absolutely insane, shows the kind of loyalty that\'s rare. Plus, his sense of direction is hilariously terrible, which adds this perfect comedic balance to his otherwise serious character. Zoro is the kind of friend everyone needs, someone who\'ll stand by you no matter what and push you to be better.',
    image: '/art/anime-2.png',
    category: 'Anime',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 7,
    title: 'God Usopp',
    description: 'Usopp is the most relatable character in One Piece, and I mean that in the best way possible. He\'s scared, he lies constantly, he runs away from fights, but when it really matters, he always finds the courage to stand up. That\'s what makes him so special. He\'s not naturally brave like Zoro or Luffy, he has to work for it, and that struggle makes his moments of bravery hit so much harder. His lies becoming reality, like when he became God Usopp, is one of the most satisfying character arcs in the series. He starts as this scared kid telling tall tales, and through sheer will and determination, he becomes someone who can actually back up his words. His inventions are creative, his sniping skills are incredible, and his loyalty to the crew is absolute. Usopp shows us that you don\'t have to be born a hero to become one, you just have to keep pushing forward even when you\'re terrified. That\'s why he\'s God Usopp, because he earned it.',
    image: '/art/anime-3.png',
    category: 'Anime',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 8,
    title: 'Sheldon Cooper',
    description: 'Sheldon Cooper reimagined in Van Gogh\'s style is such a perfect combination. You take this character who\'s all about logic, order, and scientific precision, and you paint him with those swirling, emotional brushstrokes that Van Gogh was famous for. It\'s this beautiful contrast between Sheldon\'s rigid worldview and the expressive, almost chaotic energy of Van Gogh\'s technique. The bold colors, the thick impasto strokes, the way every brush mark feels alive and moving, it captures something about Sheldon that goes beyond his surface personality. Maybe it\'s showing the passion underneath all that logic, or maybe it\'s just hilarious to see someone so particular about everything rendered in such an expressive, free-flowing style. Either way, it works. Van Gogh would probably appreciate the irony of painting someone who\'d definitely have opinions about the scientific properties of paint pigments.',
    image: '/art/image-1.png',
    category: 'Portrait',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 10,
    title: 'Phoebe Buffay',
    description: 'Phoebe Buffay and her Smelly Cat song is one of those things that just sticks with you. It\'s ridiculous, it\'s hilarious, and somehow it\'s also kind of touching. The way she performs it with complete sincerity, like it\'s this deep, meaningful song about a cat that smells, it\'s pure Phoebe energy. She\'s the weirdest friend in the group, but also the most genuine. While everyone else is trying to figure out their careers and relationships, Phoebe is just being herself, writing songs about smelly cats and not caring what anyone thinks. That\'s what makes her so special. She\'s unapologetically herself, and Smelly Cat became this iconic moment because it perfectly captures her quirky, authentic spirit. Plus, the fact that it became a real thing later, with Lisa Kudrow actually recording it, just makes it even better. Phoebe reminds us that sometimes the best things in life are the weird, unexpected ones that make you laugh and feel something at the same time.',
    image: '/art/image-3.png',
    category: 'Portrait',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
]

export default function ArtPage() {
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null)
  const [firstImageSliderPosition, setFirstImageSliderPosition] = useState(0)

  // Ensure scroll is enabled when art page loads (especially on mobile)
  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    // Don't force scroll position - allow natural scrolling
  }, [])

  // Split negative-series pieces (with scroll slider) from others
  const negativePieces = artPieces.filter(art => art.hasNegative)
  const nonNegativePieces = artPieces.filter(art => !art.hasNegative)

  const [activeNegativeId, setActiveNegativeId] = useState<number | null>(
    negativePieces.length > 0 ? negativePieces[0].id : null
  )

  const activeNegative =
    (activeNegativeId != null
      ? negativePieces.find(p => p.id === activeNegativeId)
      : null) || negativePieces[0] || null

  const currentIndex = selectedArt ? artPieces.findIndex(art => art.id === selectedArt.id) : -1

  const nextImage = () => {
    const index = selectedArt ? artPieces.findIndex(art => art.id === selectedArt.id) : -1
    if (index < artPieces.length - 1) {
      setSelectedArt(artPieces[index + 1])
    } else {
      setSelectedArt(artPieces[0])
    }
  }

  const prevImage = () => {
    const index = selectedArt ? artPieces.findIndex(art => art.id === selectedArt.id) : -1
    if (index > 0) {
      setSelectedArt(artPieces[index - 1])
    } else {
      setSelectedArt(artPieces[artPieces.length - 1])
    }
  }


  useEffect(() => {
    if (!selectedArt) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const index = artPieces.findIndex(art => art.id === selectedArt.id)
        if (index < artPieces.length - 1) {
          setSelectedArt(artPieces[index + 1])
        } else {
          setSelectedArt(artPieces[0])
        }
      } else if (e.key === 'ArrowLeft') {
        const index = artPieces.findIndex(art => art.id === selectedArt.id)
        if (index > 0) {
          setSelectedArt(artPieces[index - 1])
        } else {
          setSelectedArt(artPieces[artPieces.length - 1])
        }
      } else if (e.key === 'Escape') {
        setSelectedArt(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedArt])

  return (
    <div className="art-page min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-pink-300 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"
        />
        <motion.div
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg dark:shadow-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Mohana Moganti"
                width={100}
                height={100}
                className="object-contain dark:invert dark:brightness-0 dark:contrast-200"
                priority
              />
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 md:pt-12 pb-0 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Featured negative artwork with carousel list below */}
          {activeNegative && (
            <section className="min-h-screen flex flex-col items-center gap-10 pb-16 md:snap-start md:snap-always">
              {/* Big featured negative card with manual slider and text */}
              <div className="w-full">
                <FirstNegativeCard 
                  art={activeNegative} 
                  sliderPosition={firstImageSliderPosition}
                  setSliderPosition={setFirstImageSliderPosition}
                />
              </div>

              {/* Carousel of all negative pieces placed AFTER the featured card & its text */}
              <div className="w-full max-w-4xl mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Negative series
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-4">
                  {negativePieces.map(piece => (
                    <button
                      key={piece.id}
                      type="button"
                      onClick={() => setActiveNegativeId(piece.id)}
                      className={`shrink-0 w-44 md:w-56 text-left rounded-xl border transition-all duration-200 bg-gray-900/80 dark:bg-gray-950/80 hover:bg-gray-800/90 hover:shadow-lg ${
                        piece.id === activeNegativeId
                          ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/60'
                          : 'border-gray-700/70'
                      }`}
                    >
                      <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-t-xl bg-black">
                        <Image
                          src={piece.negativeImage || piece.image}
                          alt={piece.title}
                          fill
                          className="object-contain"
                          sizes="220px"
                        />
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-sm font-semibold text-gray-100 truncate">
                          {piece.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {piece.year} • {piece.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Remaining artworks including GIF sequence and non-negative pieces */}
          {/* Gallery List with Images and Text Side by Side - Snap Scroll */}
          <div className="space-y-0">
            {nonNegativePieces.map((art, index) => (
              <ArtCard
                key={art.id}
                art={art}
                index={index + (activeNegative ? 1 : 0)}
                onClick={() => setSelectedArt(art)}
              />
            ))}
          </div>

        </div>
      </main>

      {/* Instagram Handle */}
      <footer className="w-full py-6 md:py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
            View More Art
          </p>
          <a
            href="https://instagram.com/_dead_stone_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-xl md:text-2xl font-semibold tracking-tight"
          >
            @_dead_stone_
          </a>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent mt-2"></div>
        </motion.div>
      </footer>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-6xl w-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedArt(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all shadow-lg"
              >
                <FaTimes className="text-xl" />
              </motion.button>

              {/* Navigation Arrows */}
              {artPieces.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all shadow-lg"
                  >
                    <FaChevronLeft />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all shadow-lg"
                  >
                    <FaChevronRight />
                  </motion.button>
                </>
              )}

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 md:h-[600px] bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 flex items-center justify-center overflow-hidden">
                  {selectedArt.image && selectedArt.image !== '/art/sample1.jpg' && selectedArt.image !== '/art/sample2.jpg' ? (
                    <Image
                      src={selectedArt.image}
                      alt={selectedArt.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <span className="text-gray-400 dark:text-gray-600 text-lg z-10">
                      Large Image View
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  {/* Image counter */}
                  {artPieces.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {currentIndex + 1} / {artPieces.length}
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center p-8 md:p-12 bg-white dark:bg-gray-800">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
                  >
                    {selectedArt.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 dark:text-gray-400 mb-8 text-xl leading-relaxed font-[family-name:var(--font-caveat)] font-semibold"
                  >
                    {selectedArt.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-gray-500 dark:text-gray-500 font-semibold">
                      Year:
                    </span>
                    <span className="text-gray-900 dark:text-white text-lg font-semibold">
                      {selectedArt.year}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Page Toggle */}
      <PageToggle />
    </div>
  )
}

function ArtCard({ art, index, onClick }: { art: ArtPiece; index: number; onClick: () => void }) {
  const [sliderPosition, setSliderPosition] = useState(0)
  const [cardElement, setCardElement] = useState<HTMLDivElement | null>(null)
  const scrollLockRef = useRef({ isLocked: false })
  const currentProgressRef = useRef(0)
  const [sequenceIndex, setSequenceIndex] = useState(0)

  // Auto-play sequence like a GIF when art.sequence is provided
  useEffect(() => {
    if (!art.sequence || art.sequence.length === 0) return

    const interval = setInterval(() => {
      setSequenceIndex((prev) => (prev + 1) % art.sequence!.length)
    }, art.sequenceIntervalMs ?? 250)

    return () => clearInterval(interval)
  }, [art.sequence, art.sequenceIntervalMs])

  useEffect(() => {
    if (!art.hasNegative || !cardElement) return

    const handleScroll = () => {
      if (!cardElement) return
      
      const rect = cardElement.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const cardTop = rect.top
      const cardHeight = rect.height
      
      // Only update if not locked
      if (!scrollLockRef.current.isLocked) {
        // For mobile, use touch-based scroll progress
        if (window.innerWidth < 768) {
          // Calculate progress based on how much of the card is visible
          const visibleTop = Math.max(0, windowHeight - cardTop)
          const visibleBottom = Math.min(cardHeight, windowHeight - (cardTop - windowHeight))
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const scrollProgress = Math.max(0, Math.min(100, (visibleHeight / cardHeight) * 100))
          currentProgressRef.current = scrollProgress
          setSliderPosition(scrollProgress)
        } else {
          // Desktop: original calculation
          const scrollProgress = Math.max(0, Math.min(100, ((windowHeight - cardTop) / (windowHeight + cardHeight)) * 100))
          currentProgressRef.current = scrollProgress
          setSliderPosition(scrollProgress)
        }
      }
    }

    const preventScroll = (e: WheelEvent) => {
      // Don't prevent scroll if we're at the very top of the page - allow normal scrolling
      if (window.scrollY < 50) {
        scrollLockRef.current.isLocked = false
        return
      }
      
      // Only prevent scroll on desktop (not mobile touch)
      if (window.innerWidth < 768) return
      if (!art.hasNegative || !cardElement || !cardElement.getBoundingClientRect) return
      
      const rect = cardElement.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const cardTop = rect.top
      const cardHeight = rect.height
      
      // Check if image is centered in viewport (snapped)
      const isCentered = Math.abs(cardTop + cardHeight / 2 - windowHeight / 2) < windowHeight * 0.2
      const isInViewport = cardTop < windowHeight && cardTop + cardHeight > 0

      if (isCentered && isInViewport && currentProgressRef.current < 100) {
        // Scrolling down - advance the slider instead
        if (e.deltaY > 0) {
          e.preventDefault()
          e.stopPropagation()
          
          scrollLockRef.current.isLocked = true
          const increment = Math.min(2, 100 - currentProgressRef.current) // Advance by 2% or remaining
          currentProgressRef.current = Math.min(100, currentProgressRef.current + increment)
          setSliderPosition(currentProgressRef.current)
          
          if (currentProgressRef.current >= 100) {
            scrollLockRef.current.isLocked = false
            // Allow scroll to next item after transition completes
            setTimeout(() => {
              if (!cardElement) return
              const container = cardElement.closest('div[class*="space-y"]')?.parentElement
              if (container && cardElement.parentElement) {
                const nextCard = cardElement.parentElement.nextElementSibling as HTMLElement
                if (nextCard && nextCard.scrollIntoView) {
                  nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }
            }, 200)
          }
        } else if (e.deltaY < 0 && currentProgressRef.current > 0) {
          // Scrolling up - reverse the slider
          e.preventDefault()
          e.stopPropagation()
          
          scrollLockRef.current.isLocked = true
          const decrement = Math.min(2, currentProgressRef.current)
          currentProgressRef.current = Math.max(0, currentProgressRef.current - decrement)
          setSliderPosition(currentProgressRef.current)
          
          if (currentProgressRef.current <= 0) {
            scrollLockRef.current.isLocked = false
          }
        }
      } else {
        scrollLockRef.current.isLocked = false
        // Only prevent scroll if we're actively transitioning (not at top of page)
        if (window.scrollY > 100 && isInViewport && !isCentered && currentProgressRef.current < 100) {
          // If in viewport but not centered, snap to center first (only if not at top)
          if (e.deltaY > 0 && cardElement && cardElement.scrollIntoView) {
            e.preventDefault()
            e.stopPropagation()
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', preventScroll, { passive: false })
    
    // Add touch handlers for mobile slider
    let touchStartY = 0
    let touchStartProgress = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      // Don't lock scroll if we're at the top of the page
      if (window.scrollY < 50) {
        scrollLockRef.current.isLocked = false
        return
      }
      
      if (window.innerWidth >= 768) return
      if (!art.hasNegative || !cardElement) return
      
      const rect = cardElement.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInViewport) {
        touchStartY = e.touches[0].clientY
        touchStartProgress = currentProgressRef.current
        scrollLockRef.current.isLocked = true
      }
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (window.innerWidth >= 768) return
      if (!art.hasNegative || !cardElement || !scrollLockRef.current.isLocked) return
      
      const rect = cardElement.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInViewport) {
        const touchCurrentY = e.touches[0].clientY
        const deltaY = touchStartY - touchCurrentY
        const progressDelta = (deltaY / rect.height) * 100
        const newProgress = Math.max(0, Math.min(100, touchStartProgress + progressDelta))
        
        currentProgressRef.current = newProgress
        setSliderPosition(newProgress)
      }
    }
    
    const handleTouchEnd = () => {
      if (window.innerWidth >= 768) return
      scrollLockRef.current.isLocked = false
    }
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [art.hasNegative, art.id, cardElement])

  // Determine aspect ratio based on art piece type
  const getAspectRatio = () => {
    switch (art.aspectRatio) {
      case 'landscape':
        return '4/3'
      case 'square':
        return '1/1'
      case 'portrait':
      default:
        return '3/4'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center min-h-screen pb-20 md:pb-0"
    >
      {/* Image Section with Scroll-Based Filter */}
      <div 
        ref={setCardElement}
        id={`art-card-${art.id}`}
        className="relative w-full md:w-1/3 flex-shrink-0 select-none"
        style={{ aspectRatio: getAspectRatio() }}
        onClick={!art.hasNegative ? onClick : undefined}
      >
        {/* Proper Wooden Frame with 3D Structure */}
        <div className="w-full h-full relative">
          {/* Outer shadow */}
          <div className="absolute inset-0" style={{ 
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Outer frame border - thick wood frame */}
            <div 
              className="w-full h-full relative"
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #6B4423 0%, #8B4513 20%, #A0522D 40%, #8B4513 60%, #6B4423 80%, #8B4513 100%)',
                backgroundSize: '400% 400%',
                borderRadius: '4px',
                boxShadow: `
                  inset 0 4px 12px rgba(0, 0, 0, 0.7),
                  inset 0 -4px 12px rgba(0, 0, 0, 0.5),
                  0 4px 8px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(107, 68, 35, 0.8)
                `
              }}
            >
              {/* Wood grain texture - vertical */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 4px,
                      rgba(107, 68, 35, 0.5) 4px,
                      rgba(107, 68, 35, 0.5) 5px,
                      transparent 5px,
                      transparent 9px
                    )
                  `,
                  borderRadius: '4px'
                }}
              />
              {/* Wood grain texture - horizontal */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 3px,
                      rgba(139, 69, 19, 0.4) 3px,
                      rgba(139, 69, 19, 0.4) 4px
                    )
                  `,
                  borderRadius: '4px'
                }}
              />
              {/* Wood highlights for 3D effect */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 25%),
                    linear-gradient(225deg, rgba(0, 0, 0, 0.3) 0%, transparent 25%),
                    linear-gradient(45deg, rgba(0, 0, 0, 0.2) 75%, transparent 100%),
                    linear-gradient(315deg, rgba(255, 255, 255, 0.1) 75%, transparent 100%)
                  `,
                  borderRadius: '4px'
                }}
              />
              {/* Wood knots and natural variations */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `
                    radial-gradient(ellipse 80px 60px at 15% 25%, rgba(107, 68, 35, 0.5) 0%, transparent 60%),
                    radial-gradient(ellipse 60px 80px at 85% 75%, rgba(139, 69, 19, 0.4) 0%, transparent 60%),
                    radial-gradient(ellipse 40px 40px at 50% 50%, rgba(101, 67, 33, 0.3) 0%, transparent 50%)
                  `,
                  borderRadius: '4px'
                }}
              />
              
              {/* Inner rabbet (groove where picture sits) - creates depth */}
              <div 
                className="w-full h-full relative"
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #5C3A21 0%, #6B4423 50%, #5C3A21 100%)',
                  borderRadius: '2px',
                  boxShadow: `
                    inset 0 2px 6px rgba(0, 0, 0, 0.8),
                    inset 0 -2px 6px rgba(0, 0, 0, 0.6),
                    0 1px 2px rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                {/* Matting */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative"
                  style={{
                    padding: '20px',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '1px'
                  }}
                >
                  {/* Image container - ensures no cropping */}
                  <div className="w-full h-full relative overflow-hidden">
                    {/* Sequence-based GIF-like playback */}
                    {art.sequence && art.sequence.length > 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <div className="relative w-full h-full">
                          <Image
                            src={art.sequence[sequenceIndex]}
                            alt={art.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                    ) : art.image ? (
                      <>
                        {/* Before: Inverted Image (Background - shown first) */}
                        {art.hasNegative && art.negativeImage ? (
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <div className="relative w-full h-full">
                              <Image
                                src={art.negativeImage}
                                alt={`${art.title} - Inverted`}
                                fill
                                className="object-contain"
                                style={{ filter: 'invert(1)' }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <div className="relative w-full h-full">
                              <Image
                                src={art.image}
                                alt={art.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          </div>
                        )}
                        {/* After: Actual Image (Foreground with clip - revealed as you scroll) */}
                        {art.hasNegative && art.negativeImage && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center p-2"
                            style={{
                              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                            }}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={art.negativeImage}
                                alt={`${art.title} - Actual`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-600 text-lg">
                          Add your image here
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Section - Appears as you scroll */}
      <div className="flex-1 flex flex-col justify-center min-h-[200px]">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ 
            opacity: art.hasNegative ? Math.min(1, sliderPosition / 30) : 1,
            x: art.hasNegative ? (sliderPosition < 30 ? -30 : 0) : 0
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-[family-name:var(--font-caveat)] font-semibold"
        >
          {art.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Special component for first negative image with manual slider
function FirstNegativeCard({ 
  art, 
  sliderPosition, 
  setSliderPosition 
}: { 
  art: ArtPiece
  sliderPosition: number
  setSliderPosition: (value: number) => void
}) {
  const cardElement = useRef<HTMLDivElement>(null)
  const [sequenceIndex, setSequenceIndex] = useState(0)

  // Auto-play sequence like a GIF when art.sequence is provided
  useEffect(() => {
    if (!art.sequence || art.sequence.length === 0) return

    const interval = setInterval(() => {
      setSequenceIndex((prev) => (prev + 1) % art.sequence!.length)
    }, art.sequenceIntervalMs ?? 250)

    return () => clearInterval(interval)
  }, [art.sequence, art.sequenceIntervalMs])

  // Determine aspect ratio based on art piece type
  const getAspectRatio = () => {
    switch (art.aspectRatio) {
      case 'landscape':
        return '4/3'
      case 'square':
        return '1/1'
      case 'portrait':
      default:
        return '3/4'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center min-h-screen pb-20 md:pb-0"
    >
      {/* Image Section */}
      <div className="flex flex-col items-center gap-6 md:w-1/3 w-full px-2">
        <div 
          ref={cardElement}
          id={`art-card-${art.id}`}
          className="relative w-full max-w-[90vw] md:max-w-none flex-shrink-0 select-none"
          style={{ aspectRatio: getAspectRatio() }}
        >
        {/* Proper Wooden Frame with 3D Structure - Same as ArtCard */}
        <div className="w-full h-full relative">
          <div className="absolute inset-0" style={{ 
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5)'
          }}>
            <div 
              className="w-full h-full relative"
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #6B4423 0%, #8B4513 20%, #A0522D 40%, #8B4513 60%, #6B4423 80%, #8B4513 100%)',
                backgroundSize: '400% 400%',
                borderRadius: '4px',
                boxShadow: `
                  inset 0 4px 12px rgba(0, 0, 0, 0.7),
                  inset 0 -4px 12px rgba(0, 0, 0, 0.5),
                  0 4px 8px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(107, 68, 35, 0.8)
                `
              }}
            >
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 4px,
                      rgba(107, 68, 35, 0.5) 4px,
                      rgba(107, 68, 35, 0.5) 5px,
                      transparent 5px,
                      transparent 9px
                    )
                  `,
                  borderRadius: '4px'
                }}
              />
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 3px,
                      rgba(139, 69, 19, 0.4) 3px,
                      rgba(139, 69, 19, 0.4) 4px
                    )
                  `,
                  borderRadius: '4px'
                }}
              />
              <div 
                className="w-full h-full relative"
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #5C3A21 0%, #6B4423 50%, #5C3A21 100%)',
                  borderRadius: '2px',
                  boxShadow: `
                    inset 0 2px 6px rgba(0, 0, 0, 0.8),
                    inset 0 -2px 6px rgba(0, 0, 0, 0.6)
                  `
                }}
              >
                <div 
                  className="w-full h-full relative"
                  style={{
                    padding: '8px',
                    background: 'linear-gradient(135deg, #F5F5DC 0%, #FAF0E6 50%, #F5F5DC 100%)',
                    borderRadius: '2px',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="w-full h-full relative overflow-hidden rounded-sm">
                    {art.sequence && art.sequence.length > 0 ? (
                      <div className="relative w-full h-full" style={{ aspectRatio: '3/4' }}>
                        <Image
                          src={art.sequence[sequenceIndex]}
                          alt={art.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : art.image ? (
                      <>
                        {art.hasNegative && art.negativeImage ? (
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <div className="relative w-full h-full">
                              <Image
                                src={art.negativeImage}
                                alt={`${art.title} - Inverted`}
                                fill
                                className="object-contain"
                                style={{ filter: 'invert(1)' }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <div className="relative w-full h-full">
                              <Image
                                src={art.image}
                                alt={art.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          </div>
                        )}
                        {art.hasNegative && art.negativeImage && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center p-2"
                            style={{
                              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                            }}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={art.negativeImage}
                                alt={`${art.title} - Actual`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-600 text-lg">
                          Add your image here
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Slider Control - Only for negative images, below image on desktop */}
      {art.hasNegative && (
        <div className="w-full max-w-[90vw] md:max-w-md px-2 md:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <label className="block text-lg md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 md:mb-3 text-center">
              Compare Negative & Art
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full h-4 md:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9333ea 0%, #9333ea ${sliderPosition}%, #e5e7eb ${sliderPosition}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-base md:text-xs text-gray-500 dark:text-gray-400 mt-3 md:mt-2">
              <span>Art</span>
              <span>Negative</span>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Text Section - Always visible, on the right on desktop */}
      <div className="flex-1 flex flex-col justify-center min-h-[200px] w-full md:w-1/3 max-w-md mt-6 md:mt-0">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ 
            opacity: 1,
            x: 0
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-[family-name:var(--font-caveat)] font-semibold"
        >
          {art.description}
        </motion.p>
      </div>
    </motion.div>
  )
}
