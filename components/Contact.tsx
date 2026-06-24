'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa'
import { CONTACT_EMAIL, buildMailtoUrl, sendContactMessage } from '@/lib/contact'
import { useReducedMotion } from '@/lib/motion'
import SectionHeader from '@/components/SectionHeader'

const socials = [
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohana-moganti/' },
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Dead-Stone' },
]

const GMAIL_LETTER_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853'] as const

function GmailDomain() {
  return (
    <span className="inline">
      {'gmail'.split('').map((letter, i) => (
        <span
          key={letter + i}
          className="transition-colors duration-300 group-hover:!text-violet-400"
          style={{ color: GMAIL_LETTER_COLORS[i] }}
        >
          {letter}
        </span>
      ))}
      <span className="text-zinc-100 transition-colors duration-300 group-hover:text-violet-400">.com</span>
    </span>
  )
}

export default function Contact() {
  const reducedMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const enter = reducedMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }

  const inputClass =
    'w-full min-h-[44px] rounded-lg border border-zinc-800 bg-zinc-900/40 px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-[border-color,box-shadow] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const em = email.trim()
    const msg = message.trim()
    if (!em || msg.length < 8) return

    setSubmitState('sending')
    try {
      await sendContactMessage({
        name: name.trim(),
        email: em,
        subject: 'Portfolio contact',
        message: msg,
      })
      setSubmitState('sent')
      setMessage('')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section id="contact" className="section-shell bg-zinc-950">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="section-inner">
        <SectionHeader
          label="let's talk"
          watermark="CONTACT"
          labelClassName="text-violet-400"
          watermarkClassName="text-zinc-800/80"
          animate={!reducedMotion}
        />

        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...enter}>
            <a href={buildMailtoUrl()} className="group inline-block max-w-full">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600 mb-3">get in touch</p>
              <h2 className="text-[clamp(1.15rem,4.2vw,3rem)] leading-tight font-black text-zinc-100 tracking-tight break-all sm:break-normal sm:whitespace-nowrap transition-colors duration-300 group-hover:text-violet-400">
                {CONTACT_EMAIL.split('@')[0]}@
                <GmailDomain />
              </h2>
              <div className="mt-3 h-px bg-zinc-800 group-hover:bg-violet-500 transition-colors duration-300 max-w-max">
                <div className="h-px w-0 group-hover:w-full bg-violet-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </a>
            <p className="mt-5 sm:mt-6 max-w-md text-sm sm:text-base leading-relaxed text-zinc-400">
              Based in San Jose, open to remote. Hiring for AI engineering, full-stack, or founding roles — or just want to talk shop on agents, RAG, and what you&apos;re building.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Full-time', 'Contract', 'Remote', 'Founding eng'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-800 bg-zinc-900/50 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-mono text-zinc-600">Expect replies within 48 hours</p>
          </motion.div>

          <motion.form {...enter} onSubmit={submit} className="lg:mt-20">
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2">
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputClass}
                placeholder="Name"
              />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@email.com"
              />
            </div>
            <div className="relative mt-3">
              <textarea
                required
                minLength={8}
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className={`${inputClass} min-h-[120px] resize-y pb-14 pr-14`}
                placeholder="Role, collab, or idea — what's up?"
              />
              <button
                type="submit"
                disabled={submitState === 'sending'}
                aria-label="Send message"
                className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaPaperPlane size={14} className="translate-x-px -translate-y-px" />
              </button>
            </div>
            {submitState === 'sent' ? (
              <p className="mt-3 text-[11px] leading-relaxed text-emerald-300/90">Got it — I&apos;ll get back to you soon.</p>
            ) : null}
            {submitState === 'error' ? (
              <p className="mt-3 text-[11px] leading-relaxed text-amber-200/80">
                Couldn&apos;t send right now. Email {CONTACT_EMAIL} directly.
              </p>
            ) : null}
          </motion.form>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-6">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-500 transition-colors duration-200 hover:text-zinc-200"
              >
                <s.icon size={14} />
                <span className="text-xs font-mono tracking-wide">{s.label}</span>
              </a>
            ))}
            <a href="tel:+16693299412" className="text-xs font-mono text-zinc-500 transition-colors duration-200 hover:text-zinc-200">
              +1 (669) 329-9412
            </a>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-xs font-mono text-zinc-600">© 2023 Mohana Moganti</span>
            <span className="font-caveat text-sm text-zinc-700">Built with code & coffee ☕</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
