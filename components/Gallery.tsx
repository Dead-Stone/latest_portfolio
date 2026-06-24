'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaChevronUp } from 'react-icons/fa'
import SectionHeader from '@/components/SectionHeader'
import type { GalleryExperience } from '@/lib/office-gallery'
import { useReducedMotion } from '@/lib/motion'

function wallPose(seed: string, index: number) {
  let h = index * 17
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return {
    rotate: ((h % 70) - 35) / 10,
    y: ((h >> 4) % 28) - 14,
    x: ((h >> 8) % 20) - 10,
  }
}

function WorkplacePolaroid({
  company,
  image,
  logo,
  index,
  reducedMotion,
  onSelect,
}: {
  company: string
  image: string
  logo?: string
  index: number
  reducedMotion: boolean
  onSelect: () => void
}) {
  const [src, setSrc] = useState(image)
  const [lifted, setLifted] = useState(false)
  const pose = wallPose(company, index)
  const isLogo = src === logo

  const enter = reducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: '-30px' },
        transition: { duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onHoverStart={() => setLifted(true)}
      onHoverEnd={() => setLifted(false)}
      {...enter}
      whileHover={
        reducedMotion
          ? undefined
          : { rotate: 0, y: pose.y - 8, scale: 1.08, transition: { type: 'spring', stiffness: 320, damping: 22 } }
      }
      className="group relative mx-1 my-3 w-[7.25rem] flex-shrink-0 touch-manipulation sm:mx-2 sm:my-4 sm:w-[8.25rem] md:w-[9rem] lg:w-[9.5rem]"
      style={{
        rotate: pose.rotate,
        x: pose.x,
        y: pose.y,
        zIndex: lifted ? 40 : 10 + index,
        transformOrigin: '50% 80%',
      }}
    >
      <div className="relative bg-[#faf8f5] px-2 pb-5 pt-2 shadow-[0_10px_28px_rgba(0,0,0,0.22),0_2px_6px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.28),0_4px_10px_rgba(0,0,0,0.14)] dark:bg-[#f4f1ea]">
        <div
          className="pointer-events-none absolute left-1/2 top-[-7px] h-3.5 w-10 -translate-x-1/2 rounded-sm bg-amber-200/55 shadow-sm dark:bg-amber-100/35"
          aria-hidden
        />

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
          <Image
            src={src}
            alt={`${company} workplace`}
            fill
            className={`transition-transform duration-500 group-hover:scale-[1.04] ${
              isLogo ? 'object-contain bg-zinc-100 p-4' : 'object-cover'
            }`}
            sizes="(max-width: 768px) 120px, 150px"
            onError={() => {
              if (logo && src !== logo) setSrc(logo)
            }}
          />
        </div>

        <p className="mt-2 truncate px-0.5 text-center font-caveat text-[13px] leading-tight text-zinc-600 sm:text-sm dark:text-zinc-700">
          {company}
        </p>
      </div>
    </motion.button>
  )
}

export default function Gallery({ experiences }: { experiences: GalleryExperience[] }) {
  const reducedMotion = useReducedMotion()

  if (experiences.length === 0) return null

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  }

  const enter = (delay = 0) =>
    reducedMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="gallery" className="section-shell relative bg-[#e6e0d4] dark:bg-zinc-900">
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.04) 23px, rgba(0,0,0,0.04) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(0,0,0,0.04) 23px, rgba(0,0,0,0.04) 24px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(255,255,255,0.05) 23px, rgba(255,255,255,0.05) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(255,255,255,0.05) 23px, rgba(255,255,255,0.05) 24px)',
        }}
      />

      <div className="section-inner">
        <SectionHeader
          label="on the ground"
          watermark="GALLERY"
          labelClassName="text-violet-600 dark:text-violet-400"
          watermarkClassName="text-zinc-400/70 dark:text-zinc-800/80"
          animate={!reducedMotion}
        />

        <p className="relative z-10 -mt-4 mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-10">
          Snapshots from offices and teams behind the roles above — pinned up like a wall of memories.
        </p>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-wrap items-center justify-center px-2 py-4 sm:px-4 sm:py-6">
          {experiences.map((exp, i) => (
            <WorkplacePolaroid
              key={`${exp.company}-${exp.period}`}
              company={exp.company}
              image={exp.officePhoto}
              logo={exp.logo}
              index={i}
              reducedMotion={reducedMotion}
              onSelect={scrollToExperience}
            />
          ))}
        </div>

        <motion.div {...enter(0.35)} className="mt-8 flex justify-end sm:mt-10">
          <button
            type="button"
            onClick={scrollToExperience}
            className="inline-flex items-center gap-2 font-caveat text-lg text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View experience timeline
            <FaChevronUp size={12} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
