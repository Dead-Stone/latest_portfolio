'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Scala', 'SQL', 'Golang', 'C++'],
  },
  {
    title: 'AI / ML',
    skills: ['LangChain', 'CrewAI', 'RAG', 'GraphRAG', 'RAPTOR', 'Gemini', 'OpenAI', 'Stable Diffusion', 'Vector Databases', 'Agentic Workflows'],
  },
  {
    title: 'Frameworks',
    skills: ['FastAPI', 'Django', 'Flask', 'Spring Boot', 'ReactJS', 'GraphQL', 'Apollo Router', 'Svelte', 'Tailwind'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Neo4j', 'Weaviate', 'DynamoDB', 'Pinecone', 'AstraDB', 'ChromaDB', 'MySQL'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'ArgoCD', 'Prometheus', 'Grafana'],
  },
  {
    title: 'Data',
    skills: ['Spark', 'Databricks', 'Snowflake', 'Hadoop', 'Flink', 'Feature Engineering', 'Data Pipelines'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-shell bg-zinc-100 dark:bg-zinc-950">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Radial fade */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#f4f4f5_90%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#09090b_90%)]" />
      {/* Violet glow top-right */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="section-inner">

        {/* Watermark + label */}
        <SectionHeader
          label="what I work with"
          watermark="SKILLS"
          labelClassName="text-violet-400"
          watermarkClassName="text-zinc-300 dark:text-zinc-800/80"
          animate
        />

        {/* Skills as flowing prose blocks */}
        <div className="space-y-8 sm:space-y-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-1 gap-2 sm:grid-cols-[140px_1fr] sm:gap-6 items-start"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-600/80 dark:text-violet-500/70 pt-1">
                {cat.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 + j * 0.02 }}
                    className="cursor-default rounded-full border border-zinc-300/80 px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs text-zinc-700 transition-all duration-150 hover:border-violet-400/55 hover:bg-violet-500/10 hover:text-violet-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-violet-950/40 dark:hover:text-violet-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
      </div>
    </section>
  )
}
