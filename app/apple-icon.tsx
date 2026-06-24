import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #09090b 0%, #1e1033 55%, #09090b 100%)',
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#8b5cf6',
            boxShadow: '0 0 28px #8b5cf6',
            marginBottom: 14,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#ddd6fe',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          M
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#a78bfa',
          }}
        >
          MMS
        </div>
      </div>
    ),
    { ...size },
  )
}
