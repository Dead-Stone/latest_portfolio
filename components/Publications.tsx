'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import SectionHeader from '@/components/SectionHeader'

const publications = [
  {
    title: 'Learning-Based Approach for Hindi Text Sentiment Analysis using Naive Bayes Classifier',
    journal: 'International Journal of Innovative Engineering Research and Technology (IJIERT)',
    year: '2020',
    abstract: 'Proposed a machine learning approach for sentiment classification of Hindi-language text using a Naive Bayes classifier, addressing the unique morphological and syntactic challenges of Hindi NLP.',
    tags: ['NLP', 'Sentiment Analysis', 'Naive Bayes', 'Hindi NLP', 'Machine Learning'],
    url: 'https://d1wqtxts1xzle7.cloudfront.net/64236629/1597854990_Volume_7__Issue_8-libre.pdf?1598007025=&response-content-disposition=inline%3B+filename%3DIJIERT_LEARNING_BASED_APPROACH_FOR_HINDI.pdf&Expires=1782251390&Signature=G5jZABs8RyicpBb6TIDMZ0jORmHayV31-y00N4m9FEtwUg6hoXfBqpjaARxcmUCA2T5e59i0LGrIU3D-o8-AbDHM0Pg2QGIsNApkS-1eAewNHxcurYl4k~7WkI-UoAEGxgg40snb3M2WmpTRRKdwIf-RbP5u0jo53iWU4GPWPdIKBvzTrKrZ9sdbLqeoR3zUQKERUGRxD-fbfW5Ad6CAoSW9nbGI7OyMDA5mpBEkt66x-~X7A1DtS4m7VBFDOaBRGmRIwGDrRwQlY59GdVoNCOI0ewwwgQKLJqKvBEWgARvQglkO8L1y0yk~LxopokWWojhAOJNYVACi9Am6d8QW7g__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA',
  },
]

export default function Publications() {
  return (
    <section id="publications" className="relative py-20 sm:py-28 px-4 sm:px-10 lg:px-16 overflow-hidden">

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
        <SectionHeader
          label="research"
          watermark="PUBLICATION"
          labelClassName="text-violet-600 dark:text-violet-400"
          watermarkClassName="text-violet-200 dark:text-violet-950"
          animate
        />

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
              <div className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-12">
                <span className="hidden sm:block text-xs font-mono text-violet-300 dark:text-violet-800 pt-1 w-6 text-right select-none">01</span>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-bold leading-snug">
                      {pub.url ? (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-900 dark:text-zinc-50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        >
                          {pub.title}
                        </a>
                      ) : (
                        <span className="text-zinc-900 dark:text-zinc-50">{pub.title}</span>
                      )}
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
