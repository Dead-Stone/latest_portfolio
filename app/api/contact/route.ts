import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/contact'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

type ContactBody = {
  name?: string
  email?: string
  subject?: string
  message?: string
  typeLabel?: string
  quoteBasis?: string
  quoteBlurb?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function buildEmailText(body: ContactBody) {
  const lines = [
    `Name: ${body.name?.trim() || '(not provided)'}`,
    `Reply email: ${body.email}`,
  ]

  if (body.typeLabel) lines.push(`Type: ${body.typeLabel}`)
  if (body.quoteBasis) {
    lines.push(`Quote basis: ${body.quoteBasis}`)
    if (body.quoteBlurb) lines.push(`(${body.quoteBlurb})`)
  }

  lines.push('', '--- Brief ---', '', body.message ?? '')
  return lines.join('\n')
}

export async function POST(request: Request) {
  const resend = getResend()
  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }

  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''
  const subject = body.subject?.trim() || 'Portfolio contact'

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid reply email is required' }, { status: 400 })
  }

  if (message.length < 8) {
    return NextResponse.json({ error: 'Message is too short' }, { status: 400 })
  }

  const from = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>'

  const { error } = await resend.emails.send({
    from,
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject,
    text: buildEmailText({ ...body, email, message }),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
