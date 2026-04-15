'use client'

import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

interface FilmReelProps {
  images: string[]
  title: string
  intervalMs?: number
  className?: string
  /** Default 260. Larger values scale sprockets and frame proportionally for a bigger strip. */
  frameHeight?: number
  /** When true, skips built-in top/bottom viewport fades (use when parent provides page-edge fades). */
  hideViewportMask?: boolean
  /** Match page bg (#090909), no outer border/violet line; recessed L/R film rails. */
  pageBlend?: boolean
}

/*
  Realistic 35 mm film strip:
  - Two sprocket-hole columns, one on each side
  - Image area fills the space between them
  - Edge code (frame number) rotated on each side
  - Film-grain + vignette overlay on the image area
  - Thin inter-frame gap strip, like exposed base film
*/

const BASE_FRAME = 260

// Two holes per side per frame, positioned at ~20% and ~70% down the frame
const HOLE_OFFSETS = [0.2, 0.7]

interface PerfsProps {
  frameH: number
  perfW: number
  perfH: number
}

function Perforations({ frameH, perfW, perfH }: PerfsProps) {
  const gutter = Math.max(3, Math.round(perfW * 0.15))
  const holeW = Math.max(8, perfW - gutter * 2)
  return (
    <>
      {HOLE_OFFSETS.map((frac, i) => (
        <div key={`perf-${i}`}>
          <div
            className="absolute rounded-[3px] bg-zinc-950"
            style={{
              left: gutter,
              top: frameH * frac - perfH / 2,
              width: holeW,
              height: perfH,
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.95), 0 0 0 0.5px #000',
            }}
          />
          <div
            className="absolute rounded-[3px] bg-zinc-950"
            style={{
              right: gutter,
              top: frameH * frac - perfH / 2,
              width: holeW,
              height: perfH,
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.95), 0 0 0 0.5px #000',
            }}
          />
        </div>
      ))}
    </>
  )
}

export default function FilmReel({
  images,
  title,
  intervalMs = 250,
  className = '',
  frameHeight = BASE_FRAME,
  hideViewportMask = false,
  pageBlend = false,
}: FilmReelProps) {
  const { theme } = useTheme()
  const doubled = [...images, ...images]
  const scale = frameHeight / BASE_FRAME
  const FRAME_H = frameHeight
  const PERF_W = Math.max(22, Math.round(26 * scale))
  const PERF_H = Math.max(16, Math.round(20 * scale))
  const GAP_H = Math.max(8, Math.round(10 * scale))
  const frameUnit = FRAME_H + GAP_H
  const totalH = doubled.length * frameUnit
  const animDur = doubled.length * intervalMs * 2
  const edgeFont = Math.max(5, Math.round(6 * scale))

  const page = pageBlend ? (theme === 'dark' ? '#090909' : '#fafafa') : '#090909'
  const edgeCodeColor =
    pageBlend && theme === 'light' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.18)'
  const edgeCodeColorNonBlend = 'rgba(255,255,255,0.22)'
  const reelImageBg = pageBlend ? (theme === 'dark' ? '#141210' : '#f4f4f5') : '#141210'
  const railBgL =
    theme === 'dark'
      ? 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, #151413 42%, #1e1c1b 100%)'
      : 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 55%, rgba(0,0,0,0.02) 100%)'
  const railBgR =
    theme === 'dark'
      ? 'linear-gradient(270deg, rgba(0,0,0,0.55) 0%, #151413 42%, #1e1c1b 100%)'
      : 'linear-gradient(270deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 55%, rgba(0,0,0,0.02) 100%)'
  const railShadow =
    theme === 'dark'
      ? 'inset 6px 0 18px rgba(0,0,0,0.85), inset -2px 0 4px rgba(255,255,255,0.04)'
      : 'inset 6px 0 16px rgba(0,0,0,0.10), inset -2px 0 3px rgba(255,255,255,0.40)'
  const railShadowR =
    theme === 'dark'
      ? 'inset -6px 0 18px rgba(0,0,0,0.85), inset 2px 0 4px rgba(255,255,255,0.04)'
      : 'inset -6px 0 16px rgba(0,0,0,0.10), inset 2px 0 3px rgba(255,255,255,0.40)'

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: pageBlend ? page : '#12100e',
        boxShadow: pageBlend ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px #2a2420, 0 8px 28px rgba(0,0,0,0.65)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: totalH,
          animation: `reelScroll ${animDur}ms linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((img, idx) => {
          const frameNum = (idx % images.length) + 1
          return (
            <div key={`frame-${idx}`} className="relative" style={{ height: frameUnit }}>
              <div
                style={{
                  height: GAP_H,
                  background: pageBlend ? page : 'linear-gradient(to bottom, #0f0d0b, #1a1614, #0f0d0b)',
                  borderTop: pageBlend ? 'none' : '0.5px solid #2c2622',
                  borderBottom: pageBlend ? 'none' : '0.5px solid #2c2622',
                  boxShadow: pageBlend ? 'inset 0 1px 0 rgba(255,255,255,0.02)' : undefined,
                }}
              />

              <div
                className="relative"
                style={{
                  height: FRAME_H,
                  background: pageBlend ? page : 'linear-gradient(90deg, #1c1816 0%, #141210 50%, #1c1816 100%)',
                }}
              >
                {pageBlend && (
                  <>
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 top-0 z-[1]"
                      style={{
                        width: PERF_W,
                        background: railBgL,
                        boxShadow: railShadow,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute bottom-0 right-0 top-0 z-[1]"
                      style={{
                        width: PERF_W,
                        background: railBgR,
                        boxShadow: railShadowR,
                      }}
                    />
                  </>
                )}
                <div
                  className="absolute top-0 bottom-0 z-[2] overflow-hidden"
                  style={{
                    left: PERF_W,
                    right: PERF_W,
                    background: reelImageBg,
                  }}
                >
                  <Image
                    src={img}
                    alt={`${title}, frame ${frameNum}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 85vw, 420px"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.2'/%3E%3C/svg%3E")`,
                      backgroundSize: '160px 160px',
                      mixBlendMode: 'overlay',
                      opacity: 0.22,
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 50%, transparent 72%, rgba(0,0,0,0.2) 100%)',
                    }}
                  />
                </div>

                <div
                  className="pointer-events-none absolute z-[8] select-none"
                  style={{
                    left: 0,
                    width: PERF_W,
                    top: '50%',
                    transform: 'translateY(-50%) rotate(-90deg)',
                    fontSize: edgeFont,
                    letterSpacing: '0.15em',
                    fontFamily: '"Courier New", monospace',
                    color: pageBlend ? edgeCodeColor : edgeCodeColorNonBlend,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {String(frameNum).padStart(2, '0')}A
                </div>

                <div
                  className="pointer-events-none absolute z-[8] select-none"
                  style={{
                    right: 0,
                    width: PERF_W,
                    top: '50%',
                    transform: 'translateY(-50%) rotate(90deg)',
                    fontSize: edgeFont,
                    letterSpacing: '0.15em',
                    fontFamily: '"Courier New", monospace',
                    color: pageBlend ? edgeCodeColor : edgeCodeColorNonBlend,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {String(frameNum).padStart(2, '0')}A
                </div>

                <div className="pointer-events-none absolute inset-0 z-[6]">
                  <Perforations frameH={FRAME_H} perfW={PERF_W} perfH={PERF_H} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2"
        style={{
          height: FRAME_H + GAP_H * 2,
          boxShadow: pageBlend
            ? theme === 'dark'
              ? 'inset 0 0 28px rgba(0,0,0,0.22)'
              : 'inset 0 0 28px rgba(0,0,0,0.06)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 14px rgba(0,0,0,0.12)',
        }}
      />

      {!pageBlend && (
        <>
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-25"
            style={{
              left: PERF_W - 1,
              width: 1,
              background:
                'linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.04) 30%, transparent 50%, rgba(255,255,255,0.04) 70%, transparent 90%)',
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-25"
            style={{
              right: PERF_W - 1,
              width: 1,
              background:
                'linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.04) 30%, transparent 50%, rgba(255,255,255,0.04) 70%, transparent 90%)',
            }}
          />
        </>
      )}

      {!hideViewportMask && (
        <>
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none z-30"
            style={{
              height: '18%',
              background: 'linear-gradient(to bottom, rgba(18,16,14,0.65) 0%, transparent 85%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-30"
            style={{
              height: '18%',
              background: 'linear-gradient(to top, rgba(18,16,14,0.65) 0%, transparent 85%)',
            }}
          />
        </>
      )}

      {!pageBlend && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-40 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.45) 50%, transparent)',
          }}
        />
      )}
    </div>
  )
}
