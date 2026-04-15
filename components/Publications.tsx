'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'

const publications = [
  {
    title: 'Learning-Based Approach for Hindi Text Sentiment Analysis using Naive Bayes Classifier',
    journal: 'International Journal of Innovative Engineering Research and Technology (IJIERT)',
    year: '2020',
    abstract: 'Proposed a machine learning approach for sentiment classification of Hindi-language text using a Naive Bayes classifier, addressing the unique morphological and syntactic challenges of Hindi NLP.',
    tags: ['NLP', 'Sentiment Analysis', 'Naive Bayes', 'Hindi NLP', 'Machine Learning'],
    url: undefined as string | undefined,
  },
]

export default function Publications() {
  return (
    <section id="publications" className="relative py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">

      {/* Violet-tinted background */}
      <div className="absolute inset-0 bg-violet-50 dark:bg-[#0d0b14]" />
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #7c3aed 0px,
            #7c3aed 1px,
            transparent 1px,
            transparent 28px
          )`,
        }}
      />
      {/* Radial fade */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_30%,#f5f3ff_90%)] dark:bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_30%,#0d0b14_90%)]" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Watermark + label */}
        <div className="relative mb-14 h-28 select-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-0 -left-1 font-caveat text-violet-600 dark:text-violet-400 text-2xl z-10 pointer-events-none"
          >
            research
          </motion.p>
          <span className="absolute top-[0.5rem] left-0 text-[7rem] font-black text-violet-200 dark:text-violet-950 leading-none tracking-tighter pointer-events-none">
            PUBLICATION
          </span>
        </div>

        <div>
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-px bg-violet-200 dark:bg-violet-900/60" />
              <div className="py-10 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-12">
                <span className="hidden sm:block text-xs font-mono text-violet-300 dark:text-violet-800 pt-1 w-6 text-right select-none">01</span>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                      {pub.title}
                    </h3>
                    {pub.url && (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 text-violet-400 hover:text-violet-600 transition-colors">
                        <FaExternalLinkAlt size={13} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs font-mono text-violet-500/70 dark:text-violet-600 mb-4">
                    {pub.journal} · {pub.year}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 max-w-2xl">
                    {pub.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag, j) => (
                      <span key={j} className="text-[11px] px-2.5 py-1 rounded-full border border-violet-200 dark:border-violet-900 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-950/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-px bg-violet-200 dark:bg-violet-900/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
