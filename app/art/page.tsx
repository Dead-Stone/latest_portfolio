'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import ThemeToggle from '@/components/ThemeToggle'
import PageToggle from '@/components/PageToggle'
import FilmReel from '@/components/FilmReel'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import Lottie from 'lottie-react'
import commissionIllustration from '../../public/Illustrator Animation.json'
import { CONTACT_EMAIL, buildMailtoUrl, sendContactMessage } from '@/lib/contact'

function isWidePolaroid(art: ArtPiece) {
  return art.imgW / art.imgH > 1.85
}

const ART_REQUEST_TYPES: { value: string; label: string }[] = [
  { value: 'portrait', label: 'Portrait / likeness' },
  { value: 'fan-art', label: 'Fan art' },
  { value: 'gift', label: 'Gift piece' },
  { value: 'original', label: 'Original concept' },
  { value: 'other', label: 'Something else' },
]

/** Quote is always custom; edit copy anytime. */
const QUOTE_BASIS: { id: string; label: string; blurb: string }[] = [
  {
    id: 'reference',
    label: 'From reference art',
    blurb: 'You have images or style refs. The quote follows complexity, size, and how tight we match the source.',
  },
  {
    id: 'idea',
    label: 'From the idea',
    blurb: 'No finished reference yet. I’ll price from your written brief, mood, and what we define together.',
  },
  {
    id: 'mixed',
    label: 'Images + idea',
    blurb: 'Rough refs plus direction in words. Final quote once we lock what the piece should feel like.',
  },
]

interface ArtPiece {
  id: number
  title: string
  description: string
  image: string
  negativeImage?: string
  category: string
  year: string
  imgW: number
  imgH: number
  hasNegative?: boolean
  movie?: string
  sequence?: string[]
  sequenceIntervalMs?: number
}

const artPieces: ArtPiece[] = [
  {
    id: 0,
    title: 'Jim Carrey',
    description: 'Jim Carrey as The Mask is pure chaos in the best way possible. That green face, those wild expressions, the way he could stretch reality itself with just a look. But honestly, what really got me was The Truman Show. That movie hit me in a way I still can\'t fully explain. Watching Truman discover his entire life was a lie, seeing him break free from that perfect little world, it made me think about my own reality in ways no other movie has.',
    image: '/art/c1.png',
    category: 'Animation',
    year: '2024',
    imgW: 280, imgH: 280,
    hasNegative: false,
    sequence: ['/art/c1.png','/art/c2.png','/art/c3.png','/art/c4.png','/art/c5.png','/art/c6.png','/art/c7.png','/art/c8.png','/art/c9.png'],
    sequenceIntervalMs: 250,
  },
  {
    id: 1,
    title: 'Jack Nicholson',
    description: 'Nicholson\'s Joker was the first I saw: that manic laugh and theatrical chaos made him both terrifying and oddly charming. There\'s a theatricality to him that feels almost Shakespearean. He owns every room he walks into, and the way he delivers chaos with a grin is unlike anything else in the franchise. He set the tone for every Joker that followed.',
    image: '/art/negative-1.png',
    negativeImage: '/art/negative-1.png',
    category: 'Portrait',
    year: '2024',
    imgW: 537, imgH: 816,
    hasNegative: true,
    movie: 'Batman (1989)',
  },
  {
    id: 2,
    title: 'Heath Ledger',
    description: 'Heath Ledger completely redefined what the character could be. His performance was so raw and unsettling that it earned him a well-deserved Oscar, and honestly, it changed how I think about villainy in cinema. The way he made chaos feel like a philosophy rather than just evil: that\'s something no one else has pulled off.',
    image: '/art/negative-2.png',
    negativeImage: '/art/negative-2.png',
    category: 'Portrait',
    year: '2024',
    imgW: 502, imgH: 748,
    hasNegative: true,
    movie: 'The Dark Knight (2008)',
  },
  {
    id: 3,
    title: 'Joaquin Phoenix',
    description: 'Joaquin Phoenix\'s take hit different. Watching Arthur Fleck\'s descent into madness felt uncomfortably real, like we were witnessing a person break rather than just a villain being born. His heartbreaking vulnerability is what sets him apart: you almost feel sorry for him, which is the most terrifying thing of all.',
    image: '/art/negative-3.png',
    negativeImage: '/art/negative-3.png',
    category: 'Portrait',
    year: '2024',
    imgW: 516, imgH: 740,
    hasNegative: true,
    movie: 'Joker (2019)',
  },
  {
    id: 5,
    title: 'Hisoka',
    description: 'Hisoka from Hunter x Hunter is one of those characters that just gets under your skin in the best way. His twisted charisma, that unsettling smile, the way he treats every fight like a game: he\'s dangerous, unpredictable, and completely unapologetic about who he is.',
    image: '/art/anime-1.png',
    category: 'Anime',
    year: '2024',
    imgW: 475, imgH: 790,
  },
  {
    id: 6,
    title: 'Roronoa Zoro',
    description: 'Zoro from One Piece is the definition of loyalty and determination. This guy will literally die before he breaks a promise. His three-sword style is iconic, but it\'s his unwavering commitment to becoming the world\'s greatest swordsman that really gets me.',
    image: '/art/anime-2.png',
    category: 'Anime',
    year: '2024',
    imgW: 682, imgH: 777,
  },
  {
    id: 7,
    title: 'God Usopp',
    description: 'Usopp is the most relatable character in One Piece. He\'s scared, he lies constantly, he runs away from fights, but when it really matters, he always finds the courage to stand up. His lies becoming reality: that\'s one of the most satisfying arcs in the series.',
    image: '/art/anime-3.png',
    category: 'Anime',
    year: '2024',
    imgW: 553, imgH: 682,
  },
  {
    id: 8,
    title: 'Sheldon Cooper',
    description:
      'Sheldon Cooper dropped into Edvard Munch’s The Scream: graphite portrait on the iconic bridge-and-sky composition, Flash tee and all. Sitcom precision meets expressionist panic.',
    image: '/art/image-1.png',
    category: 'TV · parody',
    year: '2024',
    imgW: 677, imgH: 847,
  },
  {
    id: 10,
    title: 'Phoebe Buffay',
    description: 'Phoebe Buffay with her guitar: soft smile, fringe coat, Smelly Cat energy without saying a word. Charcoal and texture on a quiet ground.',
    image: '/art/image-3.png',
    category: 'TV',
    year: '2024',
    imgW: 512, imgH: 773,
    movie: 'Friends',
  },
  {
    id: 11,
    title: 'Giannis Antetokounmpo',
    description:
      '2021 Finals: #34, the Larry O’Brien and Finals MVP trophies, Champions cap, full grin. Pencil study of one of the most electric celebrations in the league.',
    image: '/art/bb-1.png',
    category: 'Sports',
    year: '2024',
    imgW: 640, imgH: 820,
  },
  {
    id: 12,
    title: 'Air Jordan 1',
    description:
      'Side-profile study of the high-top that defined sneaker culture: Swoosh, wings logo, perforations, and sole shadow grounded on the page. Graphite shading and contrast.',
    image: '/art/image-2.png',
    category: 'Still life',
    year: '2024',
    imgW: 880, imgH: 600,
  },
  {
    id: 13,
    title: 'Joey Tribbiani',
    description:
      'That wide-eyed, mouth-open Friends reaction: charcoal portrait with heavy shadows and sitcom energy frozen in graphite.',
    image: '/art/image-5.png',
    category: 'TV',
    year: '2024',
    imgW: 560, imgH: 700,
    movie: 'Friends',
  },
  {
    id: 14,
    title: 'Sanji: wanted poster',
    description:
      'One Piece “ONLY ALIVE” bounty sheet: lovestruck expression, Beli bounty block, and Marine stamp in ink-wash greyscale.',
    image: '/art/anime-4.png',
    category: 'Anime',
    year: '2024',
    imgW: 720, imgH: 960,
  },
  {
    id: 15,
    title: 'Naruto: four chapters',
    description:
      'Four panels across one life: the swing, the village together, the wedding, and the Seventh Hokage cloak walking into the distance.',
    image: '/art/anime-5.png',
    category: 'Anime',
    year: '2024',
    imgW: 2000, imgH: 560,
  },
  {
    id: 16,
    title: 'Itachi Uchiha',
    description:
      'Akatsuki cloak, straw kasa, and Sharingan picked out in red on charcoal: hand reaching forward, high-contrast Naruto fan piece.',
    image: '/art/anime-6.png',
    category: 'Anime',
    year: '2024',
    imgW: 640, imgH: 880,
  },
  {
    id: 17,
    title: 'Kakashi’s team',
    description:
      'Team 7 plus Sai, Yamato, and a tiny Pakkun: a crowded “family photo” pencil piece with Kakashi center and arms crossed.',
    image: '/art/anime-7.png',
    category: 'Anime',
    year: '2024',
    imgW: 900, imgH: 700,
  },
  {
    id: 18,
    title: 'Team 7, then & now',
    description:
      'Stacked panels: grown Team 7 laughing with Kakashi above, then kid Sasuke, Sakura, and Naruto below the same dynamic.',
    image: '/art/anime-8.png',
    category: 'Anime',
    year: '2024',
    imgW: 720, imgH: 980,
  },
  {
    id: 19,
    title: 'Harley Quinn',
    description:
      'Suicide Squad energy: pigtails, “PUDDIN” choker, bat on the shoulder, piece held together with graphite grit and attitude.',
    image: '/art/image-4.png',
    category: 'Film',
    year: '2024',
    imgW: 700, imgH: 880,
    movie: 'Suicide Squad',
  },
  {
    id: 20,
    title: 'Matthew Perry',
    description:
      'Big laugh, 90s hair, soft sweatshirt folds: charcoal portrait with the pencil still in frame like the drawing just happened.',
    image: '/art/image-6.png',
    category: 'TV',
    year: '2024',
    imgW: 640, imgH: 820,
    movie: 'Friends',
  },
  {
    id: 21,
    title: 'Irrfan Khan',
    description:
      'Open smile and easy posture in pencil: a portrait study of one of the most expressive actors, light on the face and collar.',
    image: '/art/image-7.png',
    category: 'Portrait',
    year: '2024',
    imgW: 640, imgH: 780,
  },
  {
    id: 22,
    title: 'White cat study',
    description:
      'Long-haired cat in profile on black: brushy fur, whiskers, and tail; minimal palette, lots of negative space.',
    image: '/art/negative-4.png',
    negativeImage: '/art/negative-4.png',
    category: 'Animals',
    year: '2024',
    imgW: 720, imgH: 900,
    hasNegative: false,
  },
]

function usePrefersFineHover() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setOk(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return ok
}

// ── Subtle film grain overlay ────────────────────────────────────────────────
function Grain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.022] mix-blend-multiply dark:opacity-[0.04] dark:mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.3'/%3E%3C/svg%3E")`,
        backgroundSize: '220px 220px',
      }}
    />
  )
}

// ── Section label + ghost watermark header ───────────────────────────────────
function SectionHeader({
  label,
  title,
  ghost,
  align = 'left',
  titleClassName = 'font-extrabold',
}: {
  label?: string
  title?: string
  ghost: string
  align?: 'left' | 'right'
  titleClassName?: string
}) {
  const hasLabel = Boolean(label?.trim())
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mb-10 select-none sm:mb-14 ${align === 'right' ? 'text-right' : ''}`}
    >
      {hasLabel ? (
        <p className="relative z-10 font-sans text-xl font-bold tracking-tight text-violet-700/80 dark:text-violet-400/70 sm:text-[1.35rem]">
          {label}
        </p>
      ) : null}
      <span
        className={`relative z-0 block max-w-full font-sans font-black leading-[0.9] tracking-tighter break-words text-zinc-950/[0.055] dark:text-white/[0.04] ${hasLabel ? 'mt-6' : 'mt-0'}`}
        style={{
          fontSize: 'clamp(2rem, 6vw, 5.25rem)',
        }}
        aria-hidden
      >
        {ghost}
      </span>
      {title ? (
        <h2
          className={`relative z-10 mt-6 font-sans text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight ${titleClassName}`}
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          {title}
        </h2>
      ) : null}
    </motion.div>
  )
}

function CommissionIllustration() {
  return (
    <div className="mt-4 w-full max-w-[min(100%,400px)] md:mt-6" aria-hidden>
      <Lottie
        animationData={commissionIllustration}
        loop
        className="w-full [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
        style={{ height: 280, width: '100%', maxWidth: 400 }}
      />
    </div>
  )
}

function ArtRequestSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [kind, setKind] = useState('fan-art')
  const [quoteBasis, setQuoteBasis] = useState('mixed')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const em = email.trim()
    const msg = message.trim()
    if (!em || msg.length < 8) return

    const typeLabel = ART_REQUEST_TYPES.find(t => t.value === kind)?.label ?? kind
    const basis = QUOTE_BASIS.find(b => b.id === quoteBasis) ?? QUOTE_BASIS[2]

    setSubmitState('sending')
    try {
      await sendContactMessage({
        name: name.trim(),
        email: em,
        subject: `Commission brief · ${typeLabel}`,
        message: msg,
        typeLabel,
        quoteBasis: basis.label,
        quoteBlurb: basis.blurb,
      })
      setSubmitState('sent')
    } catch {
      setSubmitState('error')
    }
  }

  const inputClass =
    'w-full rounded-md border border-zinc-700/50 bg-zinc-900/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-[border-color,box-shadow] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25'

  return (
    <section id="request-art" className="relative overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(139,92,246,0.06),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-5 sm:px-10 sm:py-6 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <p className="font-sans text-base font-bold text-violet-400/85 sm:text-lg">Commissions</p>
            <h2 className="mt-0.5 font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              Want something drawn?
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
              Email brief · custom quote from your refs and/or idea. Subject, medium, timing: whatever helps.
            </p>
            <CommissionIllustration />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-4"
            >
              <div className="inline-flex rotate-[-2deg] flex-col border border-dashed border-zinc-600/80 bg-zinc-900/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span className="text-zinc-400">signedbyMMS</span>
                <span className="mt-1 text-[9px] normal-case tracking-normal text-zinc-600">
                  Sent from this form · nothing stored on this site
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 md:pl-2 lg:pl-4"
          >
            <form onSubmit={submit} className="space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="art-req-name" className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    Name <span className="font-sans normal-case text-zinc-600">(optional)</span>
                  </label>
                  <input
                    id="art-req-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={inputClass}
                    placeholder="How I should address you"
                  />
                </div>
                <div>
                  <label htmlFor="art-req-email" className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    Email <span className="text-violet-400/90">*</span>
                  </label>
                  <input
                    id="art-req-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="Where I’ll write back"
                  />
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600">Kind of piece</p>
                <div className="flex flex-wrap gap-1.5">
                  {ART_REQUEST_TYPES.map(t => {
                    const on = kind === t.value
                    return (
                      <label
                        key={t.value}
                        className={`cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 ${
                          on
                            ? 'border-violet-500/40 bg-violet-500/10 text-violet-200'
                            : 'border-zinc-700/80 bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name="art-req-kind"
                          value={t.value}
                          checked={on}
                          onChange={() => setKind(t.value)}
                        />
                        {t.label}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                  Quote from <span className="text-zinc-500">refs, idea, or both</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUOTE_BASIS.map(b => {
                    const on = quoteBasis === b.id
                    return (
                      <label
                        key={b.id}
                        title={b.blurb}
                        className={`cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 ${
                          on
                            ? 'border-violet-500/40 bg-violet-500/10 text-violet-200'
                            : 'border-zinc-700/80 bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name="art-req-quote-basis"
                          value={b.id}
                          checked={on}
                          onChange={() => setQuoteBasis(b.id)}
                        />
                        {b.label}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="art-req-msg" className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                  Brief <span className="text-violet-400/90">*</span>
                </label>
                <textarea
                  id="art-req-msg"
                  required
                  minLength={8}
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className={`${inputClass} min-h-[88px] resize-y text-[13px] leading-relaxed`}
                  placeholder="Idea, links, size, B&amp;W vs color, deadline."
                />
              </div>

              <div className="flex flex-col gap-2 pt-0.5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitState === 'sending'}
                  className="inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitState === 'sending' ? 'Sending…' : 'Send brief →'}
                </button>
                <a
                  href={buildMailtoUrl({ subject: 'Commission question' })}
                  className="text-center text-[10px] font-mono text-zinc-600 transition-colors hover:text-violet-400 sm:text-left"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              {submitState === 'sent' ? (
                <p className="text-[11px] leading-relaxed text-emerald-300/90">
                  Brief sent — I&apos;ll reply to {email.trim()}.
                </p>
              ) : null}
              {submitState === 'error' ? (
                <p className="text-[11px] leading-relaxed text-amber-200/80">
                  Couldn&apos;t send right now. Email {CONTACT_EMAIL} directly.
                </p>
              ) : null}
              <p
                className="pointer-events-none mt-2 select-none text-right font-black uppercase leading-[0.85] tracking-tighter text-white/[0.045]"
                style={{ fontSize: 'clamp(2.5rem, 14vw, 7rem)' }}
                aria-hidden
              >
                STUDIO
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ArtPage() {
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null)
  const [sequenceCollageOpen, setSequenceCollageOpen] = useState(false)
  const [galleryHeldId, setGalleryHeldId] = useState<number | null>(null)
  const [galleryFilter, setGalleryFilter] = useState<string>('featured')
  const { startTransition } = usePageTransition()
  const router = useRouter()

  const goToPortfolio = () => {
    startTransition()
    setTimeout(() => router.push('/'), 200)
  }

  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }, [])

  useEffect(() => {
    const open = Boolean(selectedArt) || sequenceCollageOpen
    if (!open) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [selectedArt, sequenceCollageOpen])

  const galleryPieces = useMemo(
    () => artPieces.filter(a => !a.hasNegative && (!a.sequence || a.sequence.length === 0)),
    [],
  )
  const negativeGalleryPieces = useMemo(
    () => artPieces.filter(a => Boolean(a.negativeImage) && (!a.sequence || a.sequence.length === 0)),
    [],
  )
  const galleryCategories = useMemo(
    () =>
      Array.from(new Set(galleryPieces.map(p => p.category)))
        .filter(c => c !== 'Animals')
        .sort((a, b) => a.localeCompare(b)),
    [galleryPieces],
  )
  const visibleGalleryPieces = useMemo(() => {
    if (galleryFilter === 'featured') return galleryPieces.slice(0, 12)
    if (galleryFilter === 'negative') return negativeGalleryPieces
    if (galleryFilter === 'all') return galleryPieces
    return galleryPieces.filter(p => p.category === galleryFilter)
  }, [galleryFilter, galleryPieces, negativeGalleryPieces])
  const lightboxPieces = visibleGalleryPieces

  useEffect(() => {
    if (!selectedArt) return
    if (!lightboxPieces.some(p => p.id === selectedArt.id)) setSelectedArt(null)
  }, [selectedArt, lightboxPieces])

  useEffect(() => {
    if (!selectedArt) return
    const handleKey = (e: KeyboardEvent) => {
      const idx = lightboxPieces.findIndex(a => a.id === selectedArt.id)
      if (idx < 0) return
      if (e.key === 'ArrowRight') setSelectedArt(lightboxPieces[(idx + 1) % lightboxPieces.length])
      else if (e.key === 'ArrowLeft') setSelectedArt(lightboxPieces[(idx - 1 + lightboxPieces.length) % lightboxPieces.length])
      else if (e.key === 'Escape') setSelectedArt(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedArt, lightboxPieces])

  useEffect(() => {
    if (!sequenceCollageOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSequenceCollageOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sequenceCollageOpen])

  const animationPiece = artPieces.find(a => a.sequence && a.sequence.length > 0)
  /** Negative scans: hover (desktop) or press/hold (touch) to invert to positive. */
  const negativePieces = useMemo(() => artPieces.filter(a => a.hasNegative), [])

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-[#090909] dark:text-zinc-100">
      <Grain />

      {/* ── Nav ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/90 bg-white/[0.92] backdrop-blur-xl dark:border-white/[0.04] dark:bg-[rgba(9,9,9,0.88)]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-16">
          <div className="flex h-16 items-center justify-between">
            <button onClick={goToPortfolio} className="flex items-center hover:opacity-70 transition-opacity">
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
                  className="h-30 w-auto object-contain dark:[filter:invert(1)_sepia(1)_saturate(3)_hue-rotate(230deg)_brightness(1.4)]"
                  priority
                />
              </motion.div>
            </button>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={goToPortfolio}
                className="flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-medium transition-colors text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200 sm:px-0 sm:py-0 sm:text-sm sm:hover:bg-transparent dark:sm:hover:bg-transparent"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="hidden sm:inline">Portfolio</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-[2] pb-20 max-[767px]:pb-24">

        {/* ── Hero ── */}
        <section className="relative px-6 sm:px-10 lg:px-16 pt-28 pb-16 overflow-hidden sm:pb-20">
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-0"
          >
            <h1 className="relative z-10 font-caveat text-sm font-normal italic text-violet-700/85 dark:text-violet-400/70 sm:text-base">
              a lil collection of -
            </h1>
            <span
              className="relative z-0 mt-4 block font-caveat font-black pointer-events-none select-none leading-[0.9] text-zinc-950/[0.055] dark:text-white/[0.03] sm:mt-10"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                letterSpacing: '-0.03em',
              }}
              aria-hidden
            >
              MY ARTS
            </span>
          </motion.div>
        </section>

        {/* ── Negative art: invert to positive (hover / hold) ── */}
        {negativePieces.length > 0 && (
          <section className="bg-zinc-100 px-6 py-14 sm:px-10 sm:py-16 lg:px-16 dark:bg-[#050505]">
            <SectionHeader ghost="THE JOKER SERIES" />
            <div className="mt-4 flex flex-col gap-16 sm:mt-6">
              {negativePieces.map((piece, i) => (
                <JokerCard key={piece.id} piece={piece} index={i} total={negativePieces.length} />
              ))}
            </div>
          </section>
        )}

        {/* -- Jim Carrey: film reel feature -- */}
        {animationPiece && (
          <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <SectionHeader ghost="JIM CARREY" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-8 flex w-full flex-col items-center gap-12 sm:mt-12 sm:flex-row sm:items-start sm:gap-16 lg:mt-14 lg:gap-24"
              >
                {/* Film reel: tall window + page-color fades so the strip reads as scrolling in the background */}
                <button
                  type="button"
                  onClick={() => setSequenceCollageOpen(true)}
                  className="group relative z-0 w-full max-w-[min(100%,308px)] flex-shrink-0 touch-manipulation text-left sm:sticky sm:top-28 sm:max-w-[308px]"
                >
                  <div className="relative h-[min(60vw,220px)] w-full overflow-hidden bg-black transition-opacity duration-200 group-active:opacity-[0.96] sm:h-[min(48vh,500px)]">
                    <div
                      className="pointer-events-none absolute inset-x-[-6px] -top-6 z-[5] h-[30%] max-h-40 bg-gradient-to-b from-black via-black/70 to-transparent sm:inset-x-[-10px] sm:-top-8 sm:max-h-52"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-x-[-6px] -bottom-6 z-[5] h-[30%] max-h-40 bg-gradient-to-t from-black via-black/70 to-transparent sm:inset-x-[-10px] sm:-bottom-8 sm:max-h-52"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[22%] max-w-16 bg-gradient-to-r from-black via-black/70 to-transparent sm:max-w-20"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-[22%] max-w-16 bg-gradient-to-l from-black via-black/70 to-transparent sm:max-w-20"
                      aria-hidden
                    />
                    <div className="absolute inset-0">
                      <FilmReel
                        images={animationPiece.sequence!}
                        title={animationPiece.title}
                        intervalMs={280}
                        frameHeight={256}
                        hideViewportMask
                        pageBlend
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-violet-700/55 dark:text-violet-400/45">
                    <span className="sm:hidden">tap: all 9 frames</span>
                    <span className="hidden sm:inline">click: all 9 frames</span>
                  </p>
                </button>

                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 min-w-0 w-full flex-1 max-w-2xl sm:pt-1 lg:max-w-none lg:pl-4"
                >
                  <p className="mb-5 font-sans text-2xl font-bold text-violet-700/90 dark:text-violet-400/85">✎ my note</p>
                  <p className="font-sans text-xl font-bold leading-relaxed tracking-wide text-zinc-800 sm:text-2xl sm:leading-relaxed md:text-[1.5rem] md:leading-relaxed dark:text-zinc-300/95 [text-wrap:pretty]">
                    {animationPiece.description.slice(0, 220)}…
                  </p>
                  <button
                    type="button"
                    onClick={() => setSequenceCollageOpen(true)}
                    className="mt-8 flex items-center gap-2 text-left font-sans text-xl font-bold text-violet-700 transition-colors hover:text-violet-900 sm:text-2xl dark:text-violet-400 dark:hover:text-violet-300 group"
                  >
                    all 9 frames: collage
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  <p className="mt-8 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    {animationPiece.sequence!.length} frames · looped
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Gallery (after reel): image grid, tap to zoom ── */}
        {galleryPieces.length > 0 && (
          <section className="relative border-t border-zinc-200/90 bg-gradient-to-b from-zinc-100/95 via-zinc-50 to-zinc-50 dark:border-white/[0.06] dark:from-zinc-900/90 dark:via-[#090909] dark:to-[#090909]">
            <div className="mx-auto max-w-6xl px-6 pb-14 pt-10 sm:px-10 sm:pb-16 sm:pt-12 lg:px-16">
              <SectionHeader ghost="GALLERY" />
              <p className="relative z-10 mt-5 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
                Tap any image to view it full size.
              </p>
              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGalleryFilter('featured')}
                  className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                    galleryFilter === 'featured'
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-700 dark:text-violet-300'
                      : 'border-zinc-300/70 bg-white/40 text-zinc-700 hover:bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  Featured
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('all')}
                  className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                    galleryFilter === 'all'
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-700 dark:text-violet-300'
                      : 'border-zinc-300/70 bg-white/40 text-zinc-700 hover:bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('negative')}
                  className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                    galleryFilter === 'negative'
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-700 dark:text-violet-300'
                      : 'border-zinc-300/70 bg-white/40 text-zinc-700 hover:bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  Negative
                </button>
                {galleryCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryFilter(cat)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                      galleryFilter === cat
                        ? 'border-violet-500/50 bg-violet-500/10 text-violet-700 dark:text-violet-300'
                        : 'border-zinc-300/70 bg-white/40 text-zinc-700 hover:bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
                  {visibleGalleryPieces.length} shown
                </span>
              </div>
              <div className="mt-10 columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4">
                {visibleGalleryPieces.map(art => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => setSelectedArt(art)}
                    className="group break-inside-avoid mb-2 block w-full text-left sm:mb-3"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-zinc-200/80 transition-[transform,box-shadow] duration-300 focus:outline-none group-focus-visible:ring-2 group-focus-visible:ring-violet-500/60 active:scale-[0.99] dark:ring-white/[0.08] sm:group-hover:scale-[1.01]"
                      style={{ aspectRatio: `${art.imgW} / ${art.imgH}` }}
                      onPointerEnter={e => {
                        if (!art.negativeImage) return
                        if (e.pointerType === 'mouse') setGalleryHeldId(art.id)
                      }}
                      onPointerLeave={e => {
                        if (!art.negativeImage) return
                        if (e.pointerType === 'mouse') setGalleryHeldId(prev => (prev === art.id ? null : prev))
                      }}
                      onPointerDown={e => {
                        if (!art.negativeImage) return
                        if (e.pointerType === 'touch' || e.pointerType === 'pen') setGalleryHeldId(art.id)
                      }}
                      onPointerUp={e => {
                        if (!art.negativeImage) return
                        if (e.pointerType === 'touch' || e.pointerType === 'pen') setGalleryHeldId(prev => (prev === art.id ? null : prev))
                      }}
                      onPointerCancel={() => setGalleryHeldId(null)}
                    >
                      {/* Matte + subtle inner frame (prevents “wrong ratio” look and avoids harsh cropping). */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent dark:from-white/[0.04]" />
                      <div className="absolute inset-0 p-1.5 sm:p-2">
                        <div className="relative h-full w-full overflow-hidden rounded-[0.65rem] bg-black/40">
                          <Image
                            src={art.image}
                            alt={art.title}
                            fill
                            className="object-contain scale-[1.025] transition-transform duration-500 sm:group-hover:scale-[1.06]"
                            style={
                              art.negativeImage && galleryHeldId === art.id
                                ? {
                                    filter: 'invert(1) brightness(1.08) contrast(1.04)',
                                    mixBlendMode: 'normal',
                                    transition: 'filter 0.72s cubic-bezier(0.4, 0, 0.2, 1)',
                                  }
                                : undefined
                            }
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 22vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_55%,rgba(0,0,0,0.35)_100%)] opacity-70 transition-opacity duration-300 sm:group-hover:opacity-90" />
                        </div>
                      </div>

                      {/* Caption overlay */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <div className="rounded-lg border border-white/[0.10] bg-black/55 px-3 py-2 backdrop-blur-md">
                          <p className="text-[11px] font-semibold tracking-tight text-zinc-100">{art.title}</p>
                          <p className="mt-0.5 text-[9px] font-mono uppercase tracking-widest text-zinc-300/70">
                            {art.category} · {art.year}
                          </p>
                        </div>
                      </div>

                      {/* Tiny “tap” hint for mobile */}
                      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-black/45 px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-white/60 sm:hidden">
                        tap
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <ArtRequestSection />

        {/* ── Footer ── */}
        <footer className="border-t border-zinc-200 px-6 py-10 dark:border-white/[0.04] sm:px-10 sm:py-12 lg:px-16">
          <div className="flex flex-row items-start justify-between gap-4 sm:gap-8">
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-600 mb-2">more on instagram</p>
              <a
                href="https://instagram.com/_dead_stone_"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-bold leading-snug tracking-tight text-zinc-800 transition-colors duration-300 hover:text-violet-700 sm:text-xl md:text-2xl dark:text-zinc-400 dark:hover:text-violet-400"
              >
                @_dead_stone_ ↗
              </a>
            </div>
            <div className="shrink-0 select-none pt-0.5 sm:pt-0">
              <div className="relative -rotate-[30deg]">
                <div
                  className="flex w-fit flex-col items-center opacity-95"
                  style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' }}
                >
                  <p className="font-shadows text-[1.15rem] leading-none tracking-[0.02em] text-zinc-800 dark:text-zinc-200 sm:text-[1.65rem] md:text-[2rem] lg:text-[2.25rem]">
                    MMS
                  </p>

                  <svg
                    viewBox="0 0 200 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 block h-auto sm:w-[70px] md:w-[90px] lg:w-[88px]"
                    aria-hidden
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M12 12 C 60 3, 140 3, 188 12"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      className="text-zinc-900 dark:text-zinc-100"
                    />
                    <circle cx="78" cy="21" r="2.4" className="fill-zinc-900 dark:fill-zinc-100" />
                    <circle cx="122" cy="21" r="2.4" className="fill-zinc-900 dark:fill-zinc-100" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 pt-6 backdrop-blur-xl dark:bg-[rgba(4,4,4,0.94)] sm:items-center sm:p-8"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative max-h-[95dvh] w-full max-w-6xl overflow-hidden rounded-t-2xl border border-zinc-800/90 bg-[#0a0a0a] shadow-2xl dark:border-white/[0.08] dark:shadow-[0_40px_120px_rgba(0,0,0,0.9)] sm:rounded-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedArt(null)}
                className="absolute right-3 top-3 z-20 flex h-11 w-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-zinc-200/90 transition-all duration-200 hover:bg-zinc-300 sm:right-4 sm:top-4 sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0 dark:bg-white/[0.08] dark:hover:bg-white/[0.14]"
              >
                <FaTimes size={12} className="text-zinc-600 dark:text-zinc-400" />
              </button>

              {lightboxPieces.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      const idx = lightboxPieces.findIndex(a => a.id === selectedArt.id)
                      if (idx < 0) return
                      setSelectedArt(lightboxPieces[(idx - 1 + lightboxPieces.length) % lightboxPieces.length])
                    }}
                    className="absolute left-2 top-1/2 z-20 flex h-11 w-11 min-h-11 min-w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-zinc-200/90 transition-all duration-200 hover:bg-violet-500/35 sm:left-4 sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0 dark:bg-white/[0.08] dark:hover:bg-violet-500/50"
                  >
                    <FaChevronLeft size={11} className="text-zinc-700 dark:text-zinc-300" />
                  </button>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      const idx = lightboxPieces.findIndex(a => a.id === selectedArt.id)
                      if (idx < 0) return
                      setSelectedArt(lightboxPieces[(idx + 1) % lightboxPieces.length])
                    }}
                    className="absolute right-2 top-1/2 z-20 flex h-11 w-11 min-h-11 min-w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-zinc-200/90 transition-all duration-200 hover:bg-violet-500/35 sm:right-4 sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0 dark:bg-white/[0.08] dark:hover:bg-violet-500/50"
                  >
                    <FaChevronRight size={11} className="text-zinc-700 dark:text-zinc-300" />
                  </button>
                </>
              )}

              <div className="relative flex min-h-[50dvh] w-full items-center justify-center p-3 pt-14 sm:p-6 sm:pt-16 md:min-h-[55dvh]">
                <div
                  className="relative w-full max-h-[min(80dvh,900px)]"
                  style={{ aspectRatio: `${selectedArt.imgW} / ${selectedArt.imgH}` }}
                >
                  <Image
                    src={selectedArt.image}
                    alt={selectedArt.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-600">
                  {lightboxPieces.findIndex(a => a.id === selectedArt.id) + 1} / {lightboxPieces.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- Animation sequence: 9-frame collage (Jim Carrey) -- */}
      <AnimatePresence>
        {sequenceCollageOpen && animationPiece && animationPiece.sequence && animationPiece.sequence.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 pt-8 backdrop-blur-xl dark:bg-[rgba(3,3,3,0.92)] sm:items-center sm:p-6"
            onClick={() => setSequenceCollageOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border border-zinc-200/90 bg-zinc-50 shadow-2xl dark:border-white/[0.08] dark:bg-[#0c0c0c] sm:rounded-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSequenceCollageOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-zinc-200/90 transition-colors hover:bg-zinc-300 sm:h-9 sm:w-9 dark:bg-white/[0.08] dark:hover:bg-white/[0.14]"
                aria-label="Close collage"
              >
                <FaTimes size={12} className="text-zinc-600 dark:text-zinc-400" />
              </button>
              <div className="border-b border-zinc-200 px-5 pb-4 pt-6 dark:border-white/[0.06] sm:px-8 sm:pt-8">
                <p className="font-sans text-lg font-bold text-violet-700/85 dark:text-violet-400/70">frame by frame:</p>
                <h2 className="mt-1 font-sans text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                  {animationPiece.title}
                </h2>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-600">
                  {animationPiece.sequence.length} frames · collage
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3 sm:gap-3 sm:p-6">
                {animationPiece.sequence.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-lg dark:border-white/[0.08] dark:bg-zinc-950"
                  >
                    <Image
                      src={src}
                      alt={`${animationPiece.title}, frame ${i + 1}`}
                      fill
                      className="object-contain bg-black"
                      sizes="(max-width: 640px) 45vw, 200px"
                    />
                    <span className="absolute bottom-1.5 right-2 font-mono text-[10px] tracking-widest text-white/45">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageToggle />
    </div>
  )
}


// -- Joker row: polaroid + text, alternating sides --
function JokerCard({ piece, index, total }: { piece: ArtPiece; index: number; total: number }) {
  const [hovered, setHovered] = useState(false)
  const prefersFineHover = usePrefersFineHover()
  const imgLeft = index % 2 === 0
  const tilt = imgLeft ? -1.8 : 1.6

  const imgDisplayW = Math.round(340 * (piece.imgW / piece.imgH))
  const polaroidMaxW = imgDisplayW + 28

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center sm:items-start gap-10 sm:gap-14 lg:gap-20 w-full ${!imgLeft ? 'sm:flex-row-reverse' : ''} sm:flex-row`}
    >
      {/* ── Polaroid ── */}
      <motion.div
        onPointerEnter={e => {
          if (e.pointerType === 'mouse') setHovered(true)
        }}
        onPointerLeave={e => {
          if (e.pointerType === 'mouse') setHovered(false)
        }}
        onPointerDown={e => {
          if (e.pointerType === 'touch' || e.pointerType === 'pen') setHovered(true)
        }}
        onPointerUp={e => {
          if (e.pointerType === 'touch' || e.pointerType === 'pen') setHovered(false)
        }}
        onPointerCancel={() => setHovered(false)}
        whileHover={prefersFineHover ? { rotate: 0, scale: 1.03 } : undefined}
        whileTap={{ scale: 0.99 }}
        className={`flex-shrink-0 cursor-default touch-manipulation mx-auto sm:mx-0 ${imgLeft ? 'sm:ml-3 lg:ml-8' : 'sm:mr-3 lg:mr-8'}`}
        style={{
          rotate: tilt,
          transformOrigin: 'center center',
          paddingTop: 10,
          paddingLeft: 14,
          paddingRight: 14,
          paddingBottom: 28,
          background: '#1c1c1c',
          boxShadow: '0 20px 56px rgba(0,0,0,0.72), 0 0 0 0.5px rgba(255,255,255,0.05)',
          position: 'relative',
          width: `min(100%, ${polaroidMaxW}px)`,
        }}
      >
        {/* Tape strip */}
        <div
          style={{
            position: 'absolute',
            top: -9,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 52,
            height: 18,
            borderRadius: 2,
            background: 'rgba(255,228,132,0.38)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
          }}
        />

        {/* Image at natural ratio: transparent matte; lighten knocks out flat black in negatives */}
        <div
          style={{
            width: '100%',
            aspectRatio: `${piece.imgW} / ${piece.imgH}`,
            position: 'relative',
            overflow: 'hidden',
            background: 'transparent',
          }}
        >
          <Image
            src={piece.image}
            alt={piece.title}
            fill
            className="object-contain"
            style={{
              filter: hovered
                ? 'invert(1) brightness(1.08) contrast(1.04)'
                : 'invert(0)',
              mixBlendMode: hovered ? 'normal' : 'lighten',
              transition: 'filter 0.72s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            sizes="(max-width: 640px) 85vw, 360px"
            priority={index === 0}
          />
          {/* Light vignette only: avoids re-filling edges with black */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.12) 100%)' }}
          />
        </div>

        {/* Polaroid caption strip */}
        <div className="px-1 pb-0 pt-1.5 text-center leading-none">
          <p className="font-sans text-base font-bold leading-tight tracking-tight text-zinc-200">{piece.title}</p>
          {piece.movie && (
            <p className="mt-0.5 text-[9px] font-mono uppercase tracking-widest text-violet-400/60">{piece.movie}</p>
          )}
        </div>

        {/* NEG / POS badge */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '2px 8px',
            borderRadius: 2,
            fontSize: '0.58rem',
            letterSpacing: '0.16em',
            fontFamily: '"Courier New", monospace',
            background: hovered ? 'rgba(139,92,246,0.85)' : 'rgba(0,0,0,0.55)',
            border: `0.5px solid ${hovered ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: hovered ? '#fff' : 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.55s ease',
            zIndex: 10,
          }}
        >
          <span
            style={{
              width: 4, height: 4, borderRadius: '50%',
              background: hovered ? '#fff' : 'rgba(255,255,255,0.3)',
              transition: 'background 0.4s ease',
              flexShrink: 0,
            }}
          />
          {hovered ? 'POSITIVE' : 'NEGATIVE'}
        </div>
      </motion.div>

      {/* ── Text ── */}
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? 16 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`flex min-w-0 flex-1 flex-col w-full max-w-full px-5 sm:px-8 md:px-12 ${!imgLeft ? 'sm:text-right sm:items-end' : ''}`}
      >
        <div
          className={`flex items-center gap-2 mb-5 w-full ${!imgLeft ? 'sm:justify-end' : 'justify-start'}`}
        >
          <span className="font-mono text-[0.6rem] tracking-[0.16em] text-violet-700/70 dark:text-violet-400/50">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="h-px w-8 bg-violet-600/40 dark:bg-violet-800/50" />
        </div>

        <p className="w-full text-left font-sans text-xl font-normal leading-relaxed tracking-wide text-zinc-800 sm:text-right sm:text-2xl md:text-[1.75rem] dark:text-zinc-400/95 [text-wrap:pretty]">
          {piece.description}
        </p>
      </motion.div>
    </motion.div>
  )
}


