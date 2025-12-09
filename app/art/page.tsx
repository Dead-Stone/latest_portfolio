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
    title: 'Animated Sketch Sequence',
    description: 'A captivating sequential animation that brings pencil sketches to life through nine meticulously crafted frames. Each frame captures a moment in time, revealing the fluidity of motion and the delicate interplay between light and shadow. The animation showcases the raw beauty of traditional sketching techniques, where every stroke tells a story and every line carries intention. As the sequence unfolds, viewers witness the transformation from initial concept to refined artwork, celebrating the artistic process itself as much as the final result.',
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
    title: 'Artwork 1',
    description: 'This piece explores the duality of perception through the transformative power of negative space. The artwork begins as an inverted image, challenging viewers to see beyond initial impressions and discover hidden narratives within the reversed tones. As the image transitions from negative to positive, it reveals intricate details and emotional depth that were initially concealed. The composition masterfully balances contrast and harmony, creating a visual metaphor for the way perspective can completely alter our understanding of reality. Each element is carefully positioned to guide the eye through a journey of discovery, where shadows become light and darkness reveals truth.',
    image: '/art/negative-1.png',
    negativeImage: '/art/negative-1.png',
    category: 'Digital Art',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 2,
    title: 'Artwork 2',
    description: 'A striking illustration that plays with the boundaries between form and void, this piece demonstrates the profound impact of negative transformation. The artwork invites viewers to experience the same subject through two distinct visual languages—one inverted, one true—each revealing different aspects of the composition\'s essence. The negative version strips away familiar color associations, forcing us to focus on structure, form, and the fundamental relationships between elements. When revealed in its natural state, the piece blossoms with rich textures and nuanced details that create a complete narrative. This dual presentation celebrates the complexity of visual perception and the beauty found in both the expected and the unexpected.',
    image: '/art/negative-2.png',
    negativeImage: '/art/negative-2.png',
    category: 'Illustration',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 3,
    title: 'Artwork 3',
    description: 'This digital masterpiece explores the concept of visual metamorphosis through the lens of negative inversion. The artwork challenges conventional viewing experiences by presenting the same composition in two dramatically different states. In its negative form, the piece becomes an abstract exploration of tonal relationships, where the familiar becomes mysterious and the ordinary transforms into something otherworldly. The transition to the positive image is a revelation, unveiling the true character of the work with all its intended colors, textures, and emotional resonance. This interactive experience serves as a meditation on how our perception shapes reality, reminding us that beauty exists in multiple forms and that sometimes we must see things differently to truly understand them.',
    image: '/art/negative-3.png',
    negativeImage: '/art/negative-3.png',
    category: 'Digital Art',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 4,
    title: 'Artwork 4',
    description: 'A contemplative piece that uses the negative-to-positive transformation as a narrative device, this illustration tells a story of revelation and discovery. The inverted state creates an ethereal, dreamlike quality that draws viewers into a world where normal rules of perception are suspended. As the image gradually reveals its true nature, layers of meaning unfold, showing how the same visual information can evoke completely different emotional responses depending on how it\'s presented. The composition demonstrates masterful control of contrast, balance, and visual flow, creating a piece that is both technically impressive and emotionally resonant. This work celebrates the power of perspective and the endless possibilities that emerge when we view the world through different lenses.',
    image: '/art/negative-4.png',
    negativeImage: '/art/negative-4.png',
    category: 'Illustration',
    year: '2024',
    aspectRatio: 'portrait',
    hasNegative: true
  },
  {
    id: 5,
    title: 'Anime Illustration 1',
    description: 'This vibrant anime-style portrait captures the essence of expressive character design through masterful use of bold color blocking and dynamic lighting. The piece showcases a sophisticated understanding of anime aesthetics, where every color choice serves both aesthetic and narrative purposes. The lighting creates depth and dimension, highlighting key features while maintaining the distinctive flat-shaded style characteristic of the genre. The composition balances energy and elegance, with carefully placed highlights that bring the character to life. This work demonstrates how strategic color placement and lighting can convey emotion and personality, creating a character that feels both stylized and authentic.',
    image: '/art/anime-1.png',
    category: 'Anime',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 6,
    title: 'Anime Illustration 2',
    description: 'A dynamic anime composition that masterfully captures motion and energy through the strategic use of high-contrast shadows and dramatic lighting. The piece creates a sense of movement and action, with shadows that not only define form but also suggest direction and momentum. The high contrast approach amplifies the emotional impact, creating a visual intensity that draws viewers into the scene. Every shadow is carefully placed to enhance the composition\'s rhythm, guiding the eye through the artwork while maintaining focus on key elements. This illustration exemplifies how contrast can be used as a powerful storytelling tool, transforming a static image into a moment frozen in time that feels alive with potential energy.',
    image: '/art/anime-2.png',
    category: 'Anime',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 7,
    title: 'Anime Illustration 3',
    description: 'This cinematic frame draws inspiration from the art of storyboarding and key animation, capturing a moment that feels both complete and part of a larger narrative. The composition demonstrates a deep understanding of visual storytelling, where every element is positioned to convey emotion and advance the story. The piece has the quality of a carefully chosen keyframe—a moment of significance that encapsulates the essence of a scene. The lighting and composition work together to create depth and atmosphere, making viewers feel as though they\'re witnessing a pivotal moment in an animated sequence. This artwork celebrates the craft of animation, showing how a single frame can carry the weight of an entire narrative and evoke powerful emotional responses.',
    image: '/art/anime-3.png',
    category: 'Anime',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 8,
    title: 'Concept Image 1',
    description: 'A high-resolution painted piece that demonstrates exceptional mastery of atmosphere and depth. The artwork creates a rich, immersive environment where every brushstroke contributes to the overall mood and narrative. The depth is achieved through careful layering of values and colors, creating a sense of space that extends far beyond the canvas. Atmospheric perspective is skillfully employed, with distant elements fading into the background while foreground details remain crisp and defined. This piece showcases how technical precision and artistic vision can combine to create worlds that feel tangible and alive, inviting viewers to step into the scene and explore its mysteries.',
    image: '/art/image-1.png',
    category: 'Images',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 9,
    title: 'Concept Image 2',
    description: 'A delicate lighting study that showcases the artist\'s expertise in handling soft illumination and subtle color transitions. The piece demonstrates masterful edge control, where hard and soft edges are strategically placed to guide the viewer\'s attention and create visual hierarchy. The subtle gradients create smooth transitions between light and shadow, producing a sense of volume and form that feels natural and organic. This work is a testament to the importance of understanding light behavior, showing how gentle illumination can reveal form and texture in ways that harsh lighting cannot. The careful attention to detail in the gradient work creates a piece that feels both refined and effortless.',
    image: '/art/image-2.png',
    category: 'Images',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
  {
    id: 10,
    title: 'Concept Image 3',
    description: 'A beautifully framed composition that achieves perfect harmony between character silhouette and background elements. The piece demonstrates sophisticated compositional skills, where the character\'s silhouette is carefully designed to create a strong visual anchor while the background complements rather than competes. The relationship between foreground and background is masterfully balanced, with each element supporting the overall narrative. The silhouette work is particularly strong, using shape and form to convey character and emotion even without detailed features. This artwork showcases how effective composition can create powerful visual impact, proving that sometimes the most compelling images are those that understand the importance of negative space and the relationship between all elements within the frame.',
    image: '/art/image-3.png',
    category: 'Images',
    year: '2024',
    aspectRatio: 'portrait' // Update to 'landscape' or 'square' if image is wider or square
  },
]

export default function ArtPage() {
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null)

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
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-y-scroll snap-y snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
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
      <main className="pt-0 pb-0 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Featured negative artwork with carousel list below */}
          {activeNegative && (
            <section className="min-h-screen flex flex-col items-center gap-10 pb-16 snap-start snap-always">
              {/* Big featured negative card with scroll-locked slider and text */}
              <div className="w-full">
                <ArtCard art={activeNegative} index={0} onClick={() => {}} />
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
                    className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed"
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
      const rect = cardElement.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const cardTop = rect.top
      const cardHeight = rect.height
      
      // Only update if not locked
      if (!scrollLockRef.current.isLocked) {
        const scrollProgress = Math.max(0, Math.min(100, ((windowHeight - cardTop) / (windowHeight + cardHeight)) * 100))
        currentProgressRef.current = scrollProgress
        setSliderPosition(scrollProgress)
      }
    }

    const preventScroll = (e: WheelEvent) => {
      if (!art.hasNegative || !cardElement) return
      
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
              const container = cardElement.closest('div[class*="space-y"]')?.parentElement
              if (container) {
                const nextCard = cardElement.parentElement?.nextElementSibling as HTMLElement
                if (nextCard) {
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
      } else if (isInViewport && !isCentered && currentProgressRef.current < 100) {
        // If in viewport but not centered, snap to center first
        if (e.deltaY > 0) {
          e.preventDefault()
          e.stopPropagation()
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        scrollLockRef.current.isLocked = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', preventScroll, { passive: false })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', preventScroll)
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
      className="group flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center min-h-screen snap-start snap-always"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
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
          className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed"
        >
          {art.description}
        </motion.p>
      </div>
    </motion.div>
  )
}
