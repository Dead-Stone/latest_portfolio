'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const socials = [
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohana-moganti/' },
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Dead-Stone' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-[70vh] flex flex-col justify-center py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-zinc-950">

      {/* Noise-style grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      {/* Violet glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10 w-full">

        {/* Watermark + label */}
        <div className="relative mb-12 h-28 select-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-0 -left-1 font-caveat text-violet-400 text-2xl z-10 pointer-events-none"
        >
          let&apos;s talk
          </motion.p>
          <span className="absolute top-[0.5rem] left-0 text-[7rem] font-black text-zinc-800/80 leading-none tracking-tighter pointer-events-none">
            CONTACT
          </span>
        </div>

        {/* Large email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <a
            href="mailto:mohanmoganti2023@gmail.com"
            className="group inline-block"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600 mb-3">get in touch</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-100 tracking-tight leading-none group-hover:text-violet-300 transition-colors duration-300 break-all sm:break-normal">
              mohanmoganti2023
              <span className="text-violet-500 group-hover:text-violet-300 transition-colors duration-300">@</span>
              gmail.com
            </h2>
            <div className="mt-3 h-px bg-zinc-800 group-hover:bg-violet-500 transition-colors duration-300 max-w-max">
              <div className="h-px w-0 group-hover:w-full bg-violet-500 transition-all duration-500" />
            </div>
          </a>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          {/* Socials */}
          <div className="flex items-center gap-6">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-600 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
              >
                <s.icon size={14} />
                <span className="text-xs font-mono tracking-wide">{s.label}</span>
              </a>
            ))}
            <a
              href="tel:+16693299412"
              className="text-xs font-mono text-zinc-600 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
            >
              +1 (669) 329-9412
            </a>
          </div>

          {/* Footer note */}
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-xs font-mono text-zinc-600">© 2025 Mohana Moganti</span>
            <span className="font-caveat text-sm text-zinc-700">Built with code & coffee ☕</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
