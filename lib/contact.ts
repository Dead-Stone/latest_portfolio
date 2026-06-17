export const CONTACT_EMAIL = 'mohanmoganti2023@gmail.com' as const

export type ContactMessagePayload = {
  name?: string
  email: string
  subject: string
  message: string
  typeLabel?: string
  quoteBasis?: string
  quoteBlurb?: string
}

export function buildMailtoUrl(options?: { subject?: string; body?: string }) {
  const params = new URLSearchParams()
  if (options?.subject) params.set('subject', options.subject)
  if (options?.body) params.set('body', options.body)
  const query = params.toString()
  return query ? `mailto:${CONTACT_EMAIL}?${query}` : `mailto:${CONTACT_EMAIL}`
}

export function openContactEmail(options?: { subject?: string; body?: string }) {
  window.location.href = buildMailtoUrl(options)
}

export async function sendContactMessage(payload: ContactMessagePayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error || 'Failed to send message')
  }
}
