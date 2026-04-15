'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaArrowRight } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  technologies: string[]
  period: string
  organization: string
  github?: string
  demo?: string
  highlight?: boolean
}

const projects: Project[] = [
  {
    title: 'ScorePAL: Agentic Evaluation Platform',
    organization: 'SJSU',
    period: 'Dec 2024 – May 2025',
    highlight: true,
    description:
      'Multi-agent evaluation system using CrewAI where agents autonomously decompose rubrics, retrieve context via Weaviate vector search, and score submissions using Gemini on GCP. Multimodal RAG over text and image inputs reduced manual grading effort by 60%.',
    technologies: ['Python', 'CrewAI', 'Weaviate', 'Gemini', 'GCP', 'PostgreSQL', 'Multimodal RAG'],
    github: 'https://github.com/Dead-Stone/ScorePAL',
  },
  {
    title: 'AI Suspect Sketch Generator',
    organization: 'Personal',
    period: '2024',
    highlight: true,
    description:
      'Text-to-image sketch generation using Stable Diffusion + ControlNet for shape and style consistency. End-to-end full-stack with async job handling and serverless image processing on AWS. 45% latency reduction via embedding caching and request batching.',
    technologies: ['React', 'FastAPI', 'Stable Diffusion', 'ControlNet', 'AWS Lambda', 'S3', 'Python'],
    github: 'https://github.com/Dead-Stone/AI-Suspect-Sketch-Generator',
  },
  {
    title: 'Multimodal RAG System',
    organization: 'Astranetix',
    period: 'Sep – Nov 2024',
    description:
      'Production RAG combining text and document embeddings. Weaviate + GraphQL retrieval, tuned HNSW parameters. Scalable inference on AWS Lambda and S3.',
    technologies: ['Python', 'Weaviate', 'GraphQL', 'AWS Lambda', 'OpenAI', 'GCP'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'LangChain + Neo4j Knowledge Graph',
    organization: 'Personal',
    period: '2024',
    description:
      'Knowledge graph-powered RAG using LangChain and Neo4j. Hybrid search combining vector similarity and graph traversal for richer LLM responses.',
    technologies: ['LangChain', 'Neo4j', 'Python', 'RAG', 'Vector Search'],
    github: 'https://github.com/Dead-Stone/langchain_neo4j_app',
  },
  {
    title: 'Movie Ticket Booking System',
    organization: 'SJSU',
    period: 'Aug – Nov 2023',
    description:
      'Full-stack booking platform with React, Node.js, and GraphQL for real-time seat selection. Microservice backend with MongoDB, containerized via Docker, deployed with CI/CD.',
    technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Docker'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Expira: ID Expiry Tracker',
    organization: 'Personal',
    period: '2023',
    description:
      'Flutter mobile app scanning ID documents and tracking expiry dates. OCR-based extraction, push notifications, offline-first, cross-platform iOS & Android.',
    technologies: ['Flutter', 'Dart', 'OCR', 'Firebase'],
    github: 'https://github.com/Dead-Stone',
  },
]

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

export default function Projects() {
  const [p1, p2, ...rest] = projects

  return (
    <section id="projects" className="py-28 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-zinc-50 to-white dark:bg-zinc-950 dark:bg-none border-t border-zinc-100 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Watermark + label */}
        <div className="relative mb-12 h-28 select-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-0 -left-1 font-caveat text-violet-600 dark:text-violet-400 text-2xl z-10 pointer-events-none"
          >
            things I&apos;ve built
          </motion.p>
          <span className="absolute top-[0.5rem] left-0 text-[7rem] font-black text-zinc-200 dark:text-zinc-800/60 leading-none tracking-tighter pointer-events-none">
            PROJECTS
          </span>
        </div>

        {/* ── Hero featured project ── */}
        <motion.a
          href={p1.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative block rounded-2xl overflow-hidden mb-4 bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/50 hover:border-violet-400 dark:hover:border-violet-600 shadow-sm dark:shadow-none transition-all duration-300"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-white dark:from-violet-950/60 dark:via-zinc-900 dark:to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-400/5 dark:bg-violet-600/5 rounded-full blur-3xl group-hover:bg-violet-400/10 dark:group-hover:bg-violet-600/15 transition-all duration-500" />

          <div className="relative p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase">Featured</span>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-600">{p1.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-3 group-hover:text-violet-700 dark:group-hover:text-violet-200 transition-colors duration-300">
                {p1.title}
              </h3>
              <p className="mb-6 text-xs font-mono text-zinc-600 dark:text-zinc-500">{p1.organization}</p>
              <div className="flex items-center gap-2 text-zinc-600 transition-colors duration-200 group-hover:text-violet-700 dark:text-zinc-400 dark:group-hover:text-violet-400">
                <FaGithub size={14} />
                <span className="text-xs font-mono">View on GitHub</span>
                <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col justify-between">
              <p className="mb-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">{p1.description}</p>
              <div className="flex flex-wrap gap-2">
                {p1.technologies.map((t, i) => <TechTag key={i} label={t} />)}
              </div>
            </div>
          </div>
        </motion.a>

        {/* ── Two medium cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {[p2, rest[0]].map((project, i) => (
            <motion.a
              key={i}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative block rounded-xl overflow-hidden bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/50 hover:border-violet-400 dark:hover:border-violet-700 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-white to-white dark:from-violet-950/40 dark:via-zinc-900 dark:to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-500">{project.organization}</span>
                  <FaGithub className="text-zinc-600 transition-colors duration-200 group-hover:text-violet-600 dark:text-zinc-600 dark:group-hover:text-violet-400" size={14} />
                </div>
                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-3 leading-snug group-hover:text-violet-700 dark:group-hover:text-violet-200 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="mb-5 line-clamp-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, j) => <TechTag key={j} label={t} />)}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Three compact cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rest.slice(1).map((project, i) => (
            <motion.a
              key={i}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex flex-col p-5 rounded-xl border border-zinc-100/60 dark:border-zinc-800/50 hover:border-violet-200 dark:hover:border-violet-800 bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wide text-zinc-600 dark:text-zinc-600">
                  {project.organization}
                </span>
                <FaGithub className="text-zinc-600 transition-colors duration-200 group-hover:text-violet-600 dark:text-zinc-700 dark:group-hover:text-violet-400" size={13} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-2 leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-500">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((t, j) => (
                  <TechTagLight key={j} label={t} />
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-0.5 text-[11px] text-zinc-600 dark:text-zinc-600">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
