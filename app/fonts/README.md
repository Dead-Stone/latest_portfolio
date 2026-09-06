# Original portfolio fonts

Locally hosted Latin WOFF2 files from Google Fonts, retaining the existing typography:

- Caveat, variable weight 400–700: `https://fonts.gstatic.com/s/caveat/v23/Wnz6HAc5bAfYB2Q7ZjYY.woff2`
- Space Grotesk, variable weight 300–700: `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2`
- Shadows Into Light Two, weight 400: `https://fonts.gstatic.com/s/shadowsintolighttwo/v19/4iC86LVlZsRSjQhpWGedwyOoW-0A6_kpsyNmpAzHGQ.woff2`

Each family's SIL Open Font License is included alongside the files. `app/layout.tsx` loads them with `next/font/local`, keeping the original CSS variables, weights, and page styles. Builds no longer require a Google Fonts download.
