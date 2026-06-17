import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mohana Moganti — Software Engineer & AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #09090b 0%, #1e1033 45%, #09090b 100%)',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#8b5cf6',
              boxShadow: '0 0 24px #8b5cf6',
            }}
          />
          <span style={{ fontSize: 22, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a78bfa' }}>
            Portfolio
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
            Mohana Moganti
          </div>
          <div style={{ fontSize: 34, color: '#d4d4d8', maxWidth: 900, lineHeight: 1.35 }}>
            Software Engineer · AI Engineer · Full-Stack Developer
          </div>
          <div style={{ fontSize: 24, color: '#a1a1aa' }}>San Jose, CA · LLM systems · Cloud-native · Agentic AI</div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {['ScorePAL', 'LM Link', 'RAG', 'Next.js'].map(label => (
            <div
              key={label}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                border: '1px solid #3f3f46',
                fontSize: 20,
                color: '#e4e4e7',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
