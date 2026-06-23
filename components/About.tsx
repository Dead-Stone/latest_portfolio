'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'

const stats = [
  { value: '4+', label: 'yrs exp' },
  { value: '6+', label: 'companies' },
  { value: '10+', label: 'shipped' },
]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-10 lg:px-16 bg-gradient-to-br from-slate-50 via-violet-50/40 to-slate-50 dark:bg-zinc-900 dark:bg-none border-t border-violet-100 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Watermark + label */}
        <SectionHeader label="who I am" watermark="ABOUT" animate />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center divide-x divide-zinc-200 dark:divide-zinc-800 mb-10 sm:mb-12 relative z-10"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex-1 px-4 first:pl-0 sm:px-8">
              <p className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none">{s.value}</p>
              <p className="mt-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-500">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 mb-12 relative z-10" />

        {/* Bio + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 relative z-10">

          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug mb-6 tracking-tight">
              AI Engineer and builder of{' '}
              <span className="text-violet-600 dark:text-violet-400">LLM-driven systems</span>{' '}
              that work for real users.
            </p>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
              <p>
                Based in San Jose, CA. I&apos;ve spent the last 4+ years building production systems across fintech, EdTech, and AI: from compliance platforms at Deloitte to multimodal RAG at Astranetix and agentic evaluation pipelines at SJSU.
              </p>
              <p>
                I care deeply about systems that are observable, maintainable, and actually solve real problems, not just impressive demos. My stack is Python-first, cloud-native, and increasingly agent-driven.
              </p>
              <p>
                Published research on Hindi NLP. Outside engineering: basketball, sketching, and building things with my hands.
              </p>
            </div>
          </motion.div>

          {/* Right: education */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-600">education</p>
            <div className="space-y-6">
              <div className="pl-3 border-l-2 border-violet-300 dark:border-violet-700">
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">M.S. Software Engineering</p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-500">San Jose State University</p>
                <p className="mt-0.5 text-xs text-zinc-700 dark:text-zinc-600">2023 – 2025 · GPA 3.6</p>
              </div>
              <div className="pl-3 border-l-2 border-zinc-200 dark:border-zinc-700">
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">B.E. Engineering</p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-500">Osmania University, Hyderabad</p>
                <p className="mt-0.5 text-xs text-zinc-700 dark:text-zinc-600">2016 – 2020 · GPA 3.5</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
