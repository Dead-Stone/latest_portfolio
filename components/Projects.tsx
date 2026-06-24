'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaChevronRight, FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { projects, getProjectLogo, GITHUB_AVATAR_LOGO, GITHUB_BADGE_LIGHT, type Project } from '@/data/projects'
import { useReducedMotion } from '@/lib/motion'
import SectionHeader from '@/components/SectionHeader'

function TechTag({ label }: { label: string }) {
  return (
    <span className="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
      {label}
    </span>
  )
}

function TechTagLight({ label }: { label: string }) {
  return (
    <span className="rounded border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-700 dark:border-zinc-700 dark:text-zinc-400">
      {label}
    </span>
  )
}

function ProjectLinks({
  project,
  className = '',
  onLinkClick,
}: {
  project: Project
  className?: string
  onLinkClick?: (e: React.MouseEvent) => void
}) {
  if (!project.github && !project.demo) return null

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <FaGithub size={13} />
          GitHub
        </a>
      ) : null}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <FaExternalLinkAlt size={11} />
          Live {project.previewUrl ? 'Demo' : '/ Install'}
        </a>
      ) : null}
    </div>
  )
}

function ProjectLogo({ project, size = 48 }: { project: Project; size?: number }) {
  const src = getProjectLogo(project)
  if (!src) return null

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-zinc-200/70 dark:rounded-2xl dark:bg-white dark:p-2 dark:ring-zinc-700/40">
        <Image src={src} alt="" fill className="object-contain p-1" sizes={`${size}px`} />
      </div>
    </div>
  )
}

function PeriodTag({ period, className = '' }: { period: string; className?: string }) {
  return (
    <span className={`text-[10px] font-mono text-zinc-500 dark:text-zinc-500 ${className}`}>
      {period}
    </span>
  )
}

function ProjectLivePreview({
  url,
  image,
  onLinkClick,
}: {
  url: string
  image?: string
  onLinkClick: (e: React.MouseEvent) => void
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onLinkClick}
      className="group/preview block overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-100 transition-colors duration-300 hover:border-violet-400/50 dark:border-zinc-700/70 dark:bg-zinc-900/80 dark:hover:border-violet-600/45"
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-200/80 bg-zinc-50 px-2 py-1.5 shadow-[inset_0_-1px_0_rgba(15,23,42,0.06)] dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
        <span className="ml-0.5 min-w-0 flex-1 truncate text-center text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
          score-pal.vercel.app
        </span>
      </div>
      <div className="relative w-full overflow-hidden bg-zinc-200/40 shadow-[inset_0_3px_10px_rgba(15,23,42,0.14),inset_0_1px_2px_rgba(15,23,42,0.08),inset_0_0_0_1px_rgba(15,23,42,0.05)] dark:bg-zinc-950 dark:shadow-[inset_0_4px_14px_rgba(0,0,0,0.5),inset_0_1px_3px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(0,0,0,0.45)]">
        {image ? (
          <Image
            src={image}
            alt="ScorePAL homepage preview"
            width={1024}
            height={475}
            className="block w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
          />
        ) : (
          <div className="relative aspect-[1024/475] w-full">
            <iframe
              src={url}
              title="ScorePAL live preview"
              className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
              loading="lazy"
              tabIndex={-1}
            />
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_rgba(15,23,42,0.1),inset_0_8px_16px_rgba(15,23,42,0.06)] dark:shadow-[inset_0_0_36px_rgba(0,0,0,0.4),inset_0_10px_20px_rgba(0,0,0,0.25)]"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/25 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-mono text-zinc-800 shadow-sm dark:bg-zinc-900/95 dark:text-zinc-100">
            Open live site
            <FaExternalLinkAlt size={10} />
          </span>
        </div>
      </div>
    </a>
  )
}

function ProjectCardHeader({
  project,
  titleClassName,
  logoSize = 40,
  topLeft,
  titleId,
  description,
  descriptionLines,
  hideLogo,
}: {
  project: Project
  titleClassName: string
  logoSize?: number
  topLeft?: React.ReactNode
  titleId?: string
  description?: string
  descriptionLines?: number
  hideLogo?: boolean
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">{topLeft}</div>
        <PeriodTag period={project.period} className="flex-shrink-0 text-right" />
      </div>
      <div className="flex items-start gap-3">
        {!hideLogo ? <ProjectLogo project={project} size={logoSize} /> : null}
        <h3 id={titleId} className={`min-w-0 flex-1 break-words ${titleClassName}`}>
          {project.title}
        </h3>
      </div>
      {description ? (
        <p
          className={`mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400${
            descriptionLines === 4 ? ' line-clamp-4' : descriptionLines === 3 ? ' line-clamp-3' : ''
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

function ProjectDetailModal({
  project,
  onClose,
  reducedMotion,
}: {
  project: Project
  onClose: () => void
  reducedMotion: boolean
}) {
  const logo = getProjectLogo(project)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-3 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-zinc-200/80 bg-white shadow-2xl dark:border-zinc-700/60 dark:bg-zinc-900"
      >
        {logo ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-8">
              <div className="flex flex-col items-end opacity-[0.14] dark:opacity-[0.2]">
                <div className="relative h-36 w-36 sm:h-56 sm:w-56">
                  <Image src={logo} alt="" fill className="object-contain object-right" sizes="224px" />
                  {logo === GITHUB_AVATAR_LOGO ? (
                    <>
                      <span
                        className="absolute -bottom-1 -right-1 block h-10 w-10 sm:h-11 sm:w-11 dark:hidden"
                        aria-hidden
                      >
                        <Image
                          src={GITHUB_BADGE_LIGHT}
                          alt=""
                          width={44}
                          height={44}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span
                        className="absolute -bottom-1 -right-1 hidden h-10 w-10 items-center justify-center rounded-full bg-zinc-500 text-white sm:h-11 sm:w-11 dark:flex"
                        aria-hidden
                      >
                        <FaGithub size={18} />
                      </span>
                    </>
                  ) : null}
                </div>
                {project.modalWatermarkLines ? (
                  <div className="mt-3 w-48 text-right sm:w-56" aria-hidden>
                    <p className="text-lg font-bold leading-tight text-zinc-900 dark:text-white sm:text-xl">
                      {project.modalWatermarkLines[0]}
                    </p>
                    {project.modalWatermarkLines[1] ? (
                      <p className="mt-0.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 sm:text-base">
                        {project.modalWatermarkLines[1]}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="relative p-5 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Close project details"
          >
            <FaTimes size={14} />
          </button>

          <div className="mb-5 sm:mb-6 pr-10">
            <ProjectCardHeader
              project={project}
              logoSize={48}
              hideLogo
              titleId="project-modal-title"
              titleClassName="text-lg font-bold leading-tight text-zinc-900 dark:text-white sm:text-2xl"
              topLeft={
                project.featured ? (
                  <span className="inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    Featured
                  </span>
                ) : null
              }
            />
          </div>

          <p className="mb-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{project.description}</p>

          <div className="mb-6">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, i) => (
                <TechTag key={i} label={t} />
              ))}
            </div>
          </div>

          {project.github || project.demo ? (
            <ProjectLinks project={project} />
          ) : (
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">Private prototype — no public repository</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState<Project | null>(null)
  const [showAll, setShowAll] = useState(false)
  const featured = projects.find(p => p.featured) ?? projects[0]
  const secondary = projects.filter(p => p.featured && p !== featured)
  const rest = projects.filter(p => !p.featured)
  const hiddenCount = secondary.length + rest.length

  const stopLink = (e: React.MouseEvent) => e.stopPropagation()

  const enter = (delay = 0) =>
    reducedMotion
      ? { initial: false }
      : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay } }

  return (
    <section id="projects" className="section-shell bg-gradient-to-b from-zinc-50 to-white dark:bg-zinc-950 dark:bg-none">
      <div className="section-inner">
        <SectionHeader label="things I've built" watermark="PROJECTS" animate={!reducedMotion} />

        <motion.article
          {...enter()}
          role="button"
          tabIndex={0}
          onClick={() => setSelected(featured)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(featured))}
          className="group relative mb-4 cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/40 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-violet-400 dark:border-zinc-700/50 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-violet-600"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-violet-950/60 dark:via-zinc-900 dark:to-zinc-900" />
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-violet-400/5 blur-3xl transition-all duration-500 group-hover:bg-violet-400/10 dark:bg-violet-600/5 dark:group-hover:bg-violet-600/15" />

          <div className="relative grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            {featured.previewUrl ? (
              <>
                <div className="order-2 lg:order-1">
                  <ProjectLivePreview
                    url={featured.previewUrl}
                    image={featured.previewImage}
                    onLinkClick={stopLink}
                  />
                </div>
                <div className="order-1 flex flex-col lg:order-2">
                  <div className="mb-5">
                    <ProjectCardHeader
                      project={featured}
                      logoSize={56}
                      description={featured.description}
                      descriptionLines={4}
                      titleClassName="text-xl font-bold leading-tight text-zinc-900 transition-colors duration-300 group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-200 sm:text-3xl"
                      topLeft={
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                          Featured
                        </span>
                      }
                    />
                  </div>
                  <ProjectLinks project={featured} onLinkClick={stopLink} className="mb-5" />
                  <div className="mt-auto flex flex-wrap gap-2">
                    {featured.technologies.map((t, i) => (
                      <TechTag key={i} label={t} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="mb-6">
                    <ProjectCardHeader
                      project={featured}
                      logoSize={56}
                      titleClassName="text-xl font-bold leading-tight text-zinc-900 transition-colors duration-300 group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-200 sm:text-3xl"
                      topLeft={
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                          Featured
                        </span>
                      }
                    />
                  </div>
                  <ProjectLinks project={featured} onLinkClick={stopLink} />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">{featured.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {featured.technologies.map((t, i) => (
                      <TechTag key={i} label={t} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.article>

        {!showAll && hiddenCount > 0 ? (
          <motion.button
            type="button"
            {...enter(0.05)}
            onClick={() => setShowAll(true)}
            className="mb-4 flex w-full min-h-[48px] items-center justify-end gap-2 px-5 py-4 font-caveat text-lg text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            See more
            <FaChevronDown size={12} />
          </motion.button>
        ) : null}

        <AnimatePresence initial={false}>
          {showAll ? (
            <motion.div
              key="more-projects"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {secondary.map((project, i) => (
            <motion.article
              key={project.title}
              {...enter(i * 0.08)}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(project)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(project))}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-200/60 bg-white/40 shadow-sm backdrop-blur-sm transition-all duration-300 sm:hover:-translate-y-0.5 hover:border-violet-400 dark:border-zinc-800/50 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-violet-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-white to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-violet-950/40 dark:via-zinc-900 dark:to-zinc-900" />
              <div className="relative p-4 sm:p-6">
                <ProjectCardHeader
                  project={project}
                  logoSize={40}
                  titleClassName="text-lg font-bold leading-snug text-zinc-800 transition-colors duration-200 group-hover:text-violet-700 dark:text-zinc-100 dark:group-hover:text-violet-200"
                />
                <p className="mb-5 mt-3 line-clamp-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-500">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((t, j) => (
                    <TechTag key={j} label={t} />
                  ))}
                </div>
                <ProjectLinks project={project} onLinkClick={stopLink} />
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((project, i) => (
            <motion.article
              key={project.title}
              {...enter(i * 0.06)}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(project)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(project))}
              className="group flex cursor-pointer flex-col rounded-xl border border-zinc-100/60 bg-white/40 p-4 sm:p-5 backdrop-blur-sm transition-all duration-200 sm:hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-zinc-800/50 dark:bg-white/[0.03] dark:hover:border-violet-800"
            >
              <ProjectCardHeader
                project={project}
                logoSize={32}
                titleClassName="text-sm font-semibold leading-snug text-zinc-800 transition-colors duration-200 group-hover:text-violet-600 dark:text-zinc-100 dark:group-hover:text-violet-400"
              />
              <p className="mb-4 mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-500">{project.description}</p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((t, j) => (
                  <TechTagLight key={j} label={t} />
                ))}
                {project.technologies.length > 3 ? (
                  <span className="px-2 py-0.5 text-[11px] text-zinc-600 dark:text-zinc-600">+{project.technologies.length - 3}</span>
                ) : null}
              </div>
              {project.github || project.demo ? (
                <ProjectLinks project={project} onLinkClick={stopLink} />
              ) : (
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Private prototype</span>
              )}
            </motion.article>
          ))}
        </div>

              <div className="mb-6 flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-2">
                <a
                  href="https://github.com/Dead-Stone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-zinc-900 transition-colors hover:text-violet-600 dark:text-zinc-100 dark:hover:text-violet-400"
                >
                  View all repositories on GitHub
                  <FaChevronRight size={10} />
                </a>
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="inline-flex items-center gap-2 font-caveat text-lg text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  See less
                  <FaChevronUp size={12} />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected ? (
          <ProjectDetailModal project={selected} onClose={() => setSelected(null)} reducedMotion={reducedMotion} />
        ) : null}
      </AnimatePresence>
    </section>
  )
}
