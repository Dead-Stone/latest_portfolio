# Gallery-game sprite generation guide

Complete prompt set for generating every pixel-art asset needed by the
walk-through gallery at `/art` — character, floor, walls, furniture/props,
and picture frames. Written to be pasted into an image generation tool
one section at a time (each prompt is self-contained on purpose, since a
fresh image-gen call won't remember instructions from an earlier one).

**Status of what's already wired into the code today:** the character
currently renders as a generated placeholder dot (`lib/game/player.ts`),
and room floors/walls are flat color rectangles (`lib/game/BaseRoomScene.ts`).
Furniture and picture frames don't exist in the game yet at all — those
are forward-looking assets for the next pass once the base game is dressed
up. Section 6 explains how each finished PNG slots back into the code —
including the room/world rescale that needs to happen once a real 128px
character replaces the current ~20px placeholder dot.

---

## 1. Shared art bible — read this before generating anything

Every sheet below must look like it came from the same game. Repeat these
rules verbatim in each individual prompt (already done for you in the
fenced blocks) — don't rely on the model remembering them between separate
generations.

### 1.1 Pixel grid & scale

- **Base unit: 128×128 pixels.** Every sheet in this guide is built on a
  128px grid — character frames, floor tiles, wall tiles, and furniture
  props are all 128×128. This is a deliberately larger canvas than a
  classic 16/32px retro grid: it gives the image model enough working
  resolution to actually render recognizable, clean pixel art (tiny
  32px grids are where most AI-generated "pixel art" falls apart), while
  still reading as sharp pixel art rather than a painterly illustration.
  Frames/9-slices are the one sized exception, at 192×192, noted in
  Section 5 — the extra size there is border padding around the same
  128×128 artwork window.
- Export every sheet at **native resolution, no upscaling or resizing**.
  If the tool renders larger, downscale with **nearest-neighbor** only
  (never bicubic/smooth) — smooth downscaling is the #1 cause of "pixel
  art" that actually looks blurry.
- **PNG only.** Never JPEG — JPEG compression artifacts destroy flat
  pixel-color regions and hard edges.

### 1.2 Shared palette

Use this same palette family across all four sheets so the character
doesn't look like it's from a different game than the room:

| Role | Color | Used in |
|---|---|---|
| Floor warm wood A | muted warm tan/brown (~`#b98a5a` family) | Tileset |
| Floor warm wood B | slightly darker variant (~`#a5754a` family) | Tileset |
| Wall base | pale warm greige (~`#d8cfc0` family) | Tileset, Frames |
| Wall trim / baseboard | deeper brown-grey (~`#8a7a6a` family) | Tileset, Furniture |
| Brand accent (violet) | `#8b5cf6` — desaturate slightly so it reads as trim, not neon | All sheets, used sparingly |
| Frame gold | warm brass/gold (~`#c9a227` family) | Frames, Character glasses |
| Outline | dark desaturated brown/black (not pure `#000000`) | All sheets |
| Character skin | warm brown (matches reference photo) | Character |
| Character hair | dark brown/black | Character |
| Character outfit | navy blazer (~`#2b3550` family) over maroon shirt (~`#7a2436` family) | Character |

Total palette across everything: **aim for 24-32 colors max**, shared and
reused — not 32 unique colors per sheet. The larger 128px canvas can
support a bit more tonal range per color (soft internal shading bands)
than a tiny 32px sheet could, but stay disciplined — this is still flat
pixel-color shading, not smooth rendering.

### 1.3 Lighting & outline

- **Single light source from the top-left**, consistent across every
  sheet and every frame within a sheet. Shading should look like one
  consistent game world, not four independently-lit renders.
- **2-3px outline weight** (scaled up from a classic 1px line to suit
  the larger 128px canvas) — one consistent outline color used
  everywhere (a dark desaturated brown, not pure black), fully flat/hard,
  never anti-aliased or feathered.

### 1.4 Hard requirements (the difference between "sharp pixel art" and "blurry pixel filter")

- Every pixel is a **single flat color** — no anti-aliasing, no gradient
  blends, no soft edges anywhere, including silhouette edges against
  transparency.
- **No dithering** that reads as visual noise at small size.
- No motion blur, glow blur, or soft drop shadows — if something needs a
  shadow, use a **flat, hard-edged** darker-color shape, not a blurred one.
- No text, watermark, grid lines, or frame numbers baked into any sheet.

### 1.5 Transparency rules (differ per sheet — read carefully)

- **Character sheet:** fully transparent background, opaque character only.
- **Floor/Wall tileset:** fully **opaque** — every tile is a complete
  edge-to-edge fill, no transparency, *except* the one explicitly-marked
  spotlight-pool decal tile.
- **Furniture/props sheet:** fully transparent background per cell (props
  sit on top of the floor, so each prop needs to cut out cleanly).
- **Frames sheet:** transparent background outside the frame border, and
  transparent in the middle "artwork window" (that's where the real
  artwork image gets composited in later).

### 1.6 Known limitation — read before you generate

Image models are good at matching this *style* but unreliable at hitting
an *exact pixel grid* and at **seamless tiling** (a tile's left edge must
color-match its right edge, top must match bottom). The 128px base unit
mitigates this somewhat versus a tiny 32px grid, but a full multi-cell
sheet (up to 512×512) is still a large canvas to keep perfectly aligned
in one shot. Two practical mitigations:

1. For the tileset specifically, ask for a **3×3 preview repeat** of just
   the base floor tile first, to check seams before generating the full sheet.
2. If a full sheet comes back misaligned, ask for **one row (one
   direction, or one category of tiles/props) at a time** as a separate
   512-wide-by-128-tall strip instead of the whole grid at once — smaller
   grids drift far less than a full 4×3 or 4×4 sheet.
3. After generating anything, expect a short cleanup pass in a free pixel
   editor ([Aseprite](https://www.aseprite.org/), [Piskel](https://www.piskelapp.com/))
   — snap frames to the grid, fix any seam mismatches, and re-export.

If tiling seams stay broken after 2-3 attempts, it's faster to grab a
free Stardew-style interior tileset from [itch.io](https://itch.io/game-assets/tag-tileset)
or [OpenGameArt](https://opengameart.org/) for the floor/wall sheet
specifically and reserve AI generation for the character and props, which
don't need to tile.

---

## 2. Asset manifest

| # | File to save as | Canvas | Grid | Cell size | Transparency |
|---|---|---|---|---|---|
| 1 | `public/game/character.png` | 512×512 | 4 cols × 4 rows | 128×128 | Full (bg only) |
| 2 | `public/game/tileset.png` | 512×384 | 4 cols × 3 rows | 128×128 | None, except tile [4,3] |
| 3 | `public/game/furniture.png` | 512×384 | 4 cols × 3 rows | 128×128 | Full (bg only) |
| 4 | `public/game/frames.png` | 384×192 | 2 cols × 1 row | 192×192 | Full (bg + window) |

Grid coordinates below are given as `[column, row]`, both 1-indexed,
reading left-to-right, top-to-bottom.

---

## 3. Sheet 1 — Character walk-cycle spritesheet

Reference photo: `public/mohana-pixel.jpeg` (already pixel-art styled).
**Attach this photo directly in the chat alongside the prompt below** —
the image does more of the likeness work than the text description.

```
Create a 2D top-down RPG character walk-cycle spritesheet in a crisp, clean
pixel-art style — like Stardew Valley's character sprites, NOT a soft/painterly
"pixel-ish" style. Sharp, hard-edged pixels only.

CHARACTER LIKENESS (reference photo attached — please match it)
I've attached a reference photo. Use it to inform the character's likeness:
- Warm brown skin tone
- Dark, wavy hair, worn pulled back (loose low ponytail/dreadlock-adjacent
  texture), with a full, well-groomed dark beard and mustache
- Gold/yellow rectangular-frame glasses — keep these visible and legible;
  at this larger 128px scale you can render an actual thin rectangular
  frame shape instead of a simplified block, but keep the lens color flat
- Outfit: a dark navy blazer/jacket worn open over a maroon/burgundy shirt —
  smart-casual, "engineer who dresses well" vibe, not a fantasy RPG costume
Keep these features consistent and recognizable across all 4 facing
directions (glasses and beard shape should still read clearly from the side
and back views, even simplified).

CANVAS
- Total image size: 512 x 512 pixels, PNG-24 with a fully transparent
  (alpha) background — no background color, no scenery, no ground shadow
  outside each cell.
- Grid: 4 columns x 4 rows, each cell exactly 128 x 128 pixels. Cells must
  be perfectly aligned to this grid with no bleed across cell boundaries.

ROW LAYOUT (top to bottom) — one facing direction per row:
- Row 1: character facing DOWN (toward viewer / camera)
- Row 2: character facing LEFT (full side profile)
- Row 3: character facing RIGHT (full side profile, mirror of row 2)
- Row 4: character facing UP (back facing viewer / camera) — hair/back of
  head only, glasses not visible from behind, that's fine

COLUMN LAYOUT (left to right) — 4-frame walk cycle per row:
- Col 1: neutral standing pose (feet together / passing position) — this
  frame also doubles as the idle pose
- Col 2: step pose, weight on one leg, that leg forward, opposite arm
  forward (classic walk-cycle contact pose)
- Col 3: neutral passing position again (same silhouette as col 1, this
  is what makes the loop read smoothly)
- Col 4: step pose, opposite leg forward from col 2, opposite arm forward
Frames 1→2→3→4→1 should loop as a smooth, symmetric 2-step walk cycle with
no jitter in body height between frames (no vertical bounce artifacts).

CHARACTER DESIGN
- Full-body, top-down 3/4-ish "RPG Maker / Stardew Valley" proportions:
  slightly chibi, head roughly 1/3 of total body height, simple rounded
  shapes, clear readable silhouette at small size.
- Character height: approx. 100-112 pixels tall within each 128x128 cell,
  width approx. 60-72 pixels, centered horizontally in the cell, feet
  resting near the bottom of the cell with about 10-14px of empty padding
  below (baseline margin) and roughly 14-18px of empty padding on each
  side — nothing should touch or crop against the cell edge.
- One small violet/purple accent detail (hex #8b5cf6) somewhere in the
  outfit — e.g. a shirt-collar trim or shoe accent — as a subtle brand
  callback, kept muted so it doesn't look neon.

PIXEL ART TECHNICAL REQUIREMENTS
- Every pixel must be a single flat color — no anti-aliasing, no gradient
  blending, no soft/blurred edges anywhere, including at the silhouette
  edge against the transparent background.
- No dithering patterns that read as noise at small size.
- Limited, consistent palette: roughly 24-32 colors total across the
  whole sheet, reused consistently across all 4 directions (same hair
  color, same outfit colors, same glasses color in every row).
- Consistent single light source from the top-left in every frame/row, so
  shading looks like the same character rotating, not 4 different lighting
  setups.
- 2-3px outline weight (a single dark, slightly desaturated outline
  color, not pure black), flat and hard-edged, used consistently on
  every frame.
- Do NOT upscale/smooth the final image — export at native 512x512, no
  resizing, no JPEG compression (PNG only, lossless).

WHAT TO AVOID
- No motion blur, speed lines, or ground shadow ellipses that cross
  outside their own 128x128 cell.
- No text, watermark, grid lines, or frame numbers baked into the image.
- No perspective/proportion drift between the 4 rows — same character,
  same scale, same head size, only the facing direction changes.
- No background, floor tile, or scenery — transparent everywhere except
  the character.
```

---

## 4. Sheet 2 — Floor & wall tileset

12 tiles covering both room materials plus doorway/lighting detail.

**Cell map:**

| | Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|---|
| **Row 1** | Floor base A | Floor base B | Floor edge (wall shadow) | Doorway threshold |
| **Row 2** | Wall base | Wall + baseboard | Wall corner accent | Wall violet stripe |
| **Row 3** | Doorway arch header | Baseboard inside corner | Floor rug tile | Floor spotlight pool (transparent) |

```
Create a top-down 2D pixel-art tileset for a small art-gallery/museum
interior, in a crisp, clean pixel-art style — like Stardew Valley's
environment tiles, NOT a soft/painterly "pixel-ish" style. Sharp,
hard-edged pixels only. This must visually match a companion character
spritesheet: same palette family, same single top-left light source, same
2-3px outline weight, same level of detail.

CANVAS
- Total image size: 512 x 384 pixels, PNG-24.
- Grid: 4 columns x 3 rows, each cell exactly 128 x 128 pixels, tiles
  perfectly aligned with no bleed or misalignment across cell borders.
- Every tile is fully OPAQUE (no transparency) EXCEPT tile [column 4,
  row 3], which is described below and needs partial transparency.

TILE [1,1] — Floor base A
- A polished museum/gallery floor: warm wood parquet or light stone,
  subtle grain/texture, muted warm palette (tan/brown family). At this
  larger 128px tile size you can render 2-3 individual wood planks or
  stone-tile divisions within the cell — don't leave it as one flat
  featureless block.
- SEAMLESS: left edge must pixel-match the right edge, top edge must
  pixel-match the bottom edge — must repeat with zero visible seam.

TILE [2,1] — Floor base B (variant)
- Same floor material and palette as [1,1], slightly different
  grain/plank pattern so alternating the two breaks up repetition.
- Seamless on all 4 edges, same rule as [1,1].

TILE [3,1] — Floor edge (wall shadow)
- Same floor as [1,1], with a subtle hard-edged (not blurred) darkening
  band along the TOP edge only, as if a wall sits just above it.
- Left, right, and bottom edges must still tile seamlessly against
  [1,1]/[2,1]; only the top edge has the shadow band.

TILE [4,1] — Doorway threshold
- Same floor base, with a narrow decorative strip across the middle (a
  brass threshold strip, or a small rug segment) marking a doorway
  opening. Left/right edges must tile seamlessly with [1,1]/[2,1].

TILE [1,2] — Wall base
- A gallery wall panel: soft neutral tone (warm off-white/pale greige),
  subtle wainscoting/paneling detail — at 128px you can render an actual
  raised panel rectangle with a visible bevel, not just a flat tint.
- SEAMLESS on all 4 edges — needs to tile both horizontally (long wall
  runs) and vertically (tall wall runs), so keep the pattern
  direction-agnostic (no single obvious "up" grain).

TILE [2,2] — Wall + baseboard
- Same wall panel as [1,2], with a simple trim/skirting board along the
  BOTTOM edge only, for the wall row that meets the floor. Left, right,
  and top edges tile seamlessly with [1,2].

TILE [3,2] — Wall corner accent
- Same wall panel as [1,2], with a subtle decorative corner/molding
  detail in one corner, for room corners so they don't look flat. Keep
  it subtle — same wall, slightly dressed up, not a different material.

TILE [4,2] — Wall violet stripe
- Same wall panel as [1,2], with a single thin horizontal molding stripe
  in a muted violet (#8b5cf6, desaturated so it reads as trim not neon)
  across the middle. Left/right edges tile seamlessly with [1,2]/[2,2]/[3,2].

TILE [1,3] — Doorway arch header
- A decorative header/lintel piece (same wall material family, slightly
  more ornate — a simple arch or beam shape) meant to sit in the wall row
  directly above a doorway gap. Left/right edges tile seamlessly against
  wall tiles so it can sit inline in a wall run.

TILE [2,3] — Baseboard inside corner
- Same baseboard trim as [2,2], turning an inside corner (the trim line
  bends 90 degrees within the tile) for use where two wall runs meet at
  floor level.

TILE [3,3] — Floor rug tile
- Same floor family as [1,1], with a woven area-rug pattern in warm
  tones plus a small violet (#8b5cf6, muted) accent thread in the
  border design — at 128px, render an actual visible border-and-field
  rug pattern, not just a color swap. Seamless on all 4 edges like the
  other floor tiles — this is a floor material variant, not a
  standalone rug prop.

TILE [4,3] — Floor spotlight pool (SPECIAL: transparent)
- The ONE exception to "no transparency" in this sheet. A soft-looking
  but still hard-edged circular light pool, built from 3-4 concentric
  bands of a warm light color at decreasing opacity (banded, not a
  smooth gradient/blur), meant to sit as a decal ON TOP of a floor tile
  underneath a hanging painting. Transparent everywhere outside the
  light-pool shape.

TECHNICAL REQUIREMENTS (same as the character sheet)
- Every pixel a single flat color — no anti-aliasing, no gradient
  blending, no blurred/soft edges (except the explicitly-banded
  spotlight decal, which uses flat color bands, not a blur).
- No dithering that reads as noise at small size.
- Limited, consistent palette: roughly 24-32 colors total, reused across
  all 12 tiles (same floor tone family, same wall tone family).
- Consistent single light source from the top-left in every tile.
- Export at native 512x384, no upscaling/resizing, PNG only (no JPEG).

WHAT TO AVOID
- No transparency anywhere except tile [4,3].
- No text, watermark, grid lines, or tile numbers baked into the image.
- No visible seams — each floor/wall tile must repeat cleanly against a
  copy of itself.
- No scenery, furniture, or characters — tiles only.
```

---

## 5. Sheet 3 — Furniture & props

12 free-standing museum props, each in its own transparent 128×128 cell
(these sit on top of the floor, not tiled).

**Cell map:**

| | Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|---|
| **Row 1** | Centerpiece pedestal | Wooden bench | Floor lamp | Tall potted plant |
| **Row 2** | Stanchion post (rope, left) | Stanchion post (rope, right) | Museum placard | Short potted plant |
| **Row 3** | Ceiling spotlight fixture | Small side table | Wall directional sign | Rope wall anchor |

```
Create a set of top-down 2D pixel-art museum furniture/props in a crisp,
clean pixel-art style — like Stardew Valley's prop objects, NOT a
soft/painterly "pixel-ish" style. Sharp, hard-edged pixels only. This
must visually match a companion character spritesheet and floor/wall
tileset: same palette family, same single top-left light source, same
2-3px outline weight.

CANVAS
- Total image size: 512 x 384 pixels, PNG-24 with a fully transparent
  (alpha) background around every prop — each of the 12 cells is an
  independent object that must cut out cleanly from the background.
- Grid: 4 columns x 3 rows, each cell exactly 128 x 128 pixels, perfectly
  aligned with no bleed across cell boundaries.
- Every prop should be centered in its cell with roughly 10-16px of
  padding on each side — nothing touching the cell edge. Most props
  should not need to fill the entire 128x128 cell — a bench or side
  table, for example, should read at a realistic scale relative to the
  128px-tall character, not stretched to fill the frame.

PROP [1,1] — Centerpiece pedestal
- A simple museum display plinth/pedestal, waist-high, flat top surface,
  warm neutral material (matches wall tone family), with a subtle
  violet (#8b5cf6, muted) accent line or glow strip along the top edge
  where an object would be displayed on it.

PROP [2,1] — Wooden bench
- A simple museum viewing bench, side-on view, warm wood tone matching
  the floor palette, minimalist (no cushions/upholstery detail needed).

PROP [3,1] — Floor lamp / torchiere
- A tall standing lamp, thin pole base, warm-glowing shade at the top
  (flat-color glow, not blurred) in a soft warm yellow.

PROP [4,1] — Tall potted plant
- A tall leafy plant (fiddle-leaf or similar broad-leaf houseplant) in a
  simple ceramic pot, warm neutral pot color, green leaves — at 128px
  you have room for individually readable leaf shapes rather than a
  green blob.

PROP [1,2] — Stanchion post (rope, left)
- A velvet-rope stanchion post (museum queue barrier), with a rope
  segment extending off the RIGHT side of the cell (so this post can
  connect to the next one to its right). Deep maroon/burgundy rope
  (matches the character's shirt tone family) with a brass/gold post,
  matching the frame-gold accent color.

PROP [2,2] — Stanchion post (rope, right)
- Same stanchion post design as [1,2], mirrored: rope segment extends
  off the LEFT side of the cell instead, so a matched pair of these two
  props can bracket a barrier line.

PROP [3,2] — Museum placard
- A small angled reading placard/plaque on a thin stand (the kind that
  sits in front of an exhibit) — blank face except for 2-3 short flat
  horizontal line marks suggesting text, no real readable text.

PROP [4,2] — Short potted plant / succulent
- A smaller potted succulent or low leafy plant, same pot material style
  as [4,1] but shorter, for tighter corners.

PROP [1,3] — Ceiling spotlight fixture
- A wall or ceiling-mounted spotlight fixture, angled downward, casting
  an implied warm light cone rendered as 2-3 flat-color triangular bands
  (not a blurred glow) fanning down-and-out from the fixture housing.

PROP [2,3] — Small side table
- A small round or square accent table, short, same wood tone as the
  bench, for resting a plant or small object nearby.

PROP [3,3] — Wall directional sign
- A small wall-mounted directional plaque with a simple arrow shape and
  2 short flat line marks suggesting a room-name label (no real
  readable text), brass/gold frame edge matching the frame-gold accent.

PROP [4,3] — Rope wall anchor
- A wall-mounted brass rope-anchor fixture (a stanchion-rope endpoint
  that attaches directly to a wall instead of another post), same
  gold/maroon materials as [1,2]/[2,2].

TECHNICAL REQUIREMENTS (same as the character sheet)
- Every pixel a single flat color — no anti-aliasing, no gradient
  blending, no soft/blurred edges anywhere, including silhouette edges
  against the transparent background.
- No dithering that reads as noise at small size.
- Limited, consistent palette: roughly 24-32 colors total, reused across
  all 12 props (same wood tones, same gold accent, same violet accent).
- Consistent single light source from the top-left on every prop.
- Export at native 512x384, no upscaling/resizing, PNG only (no JPEG).

WHAT TO AVOID
- No motion blur or soft drop shadows — if a prop needs a ground shadow,
  make it a small flat-color hard-edged ellipse, not a blurred one.
- No text, watermark, grid lines, or prop numbers baked into the image.
- No floor tiles or background scenery — props only, transparent
  everywhere else.
- No two props overlapping into each other's cell.
```

---

## 6. Sheet 4 — Picture frames (9-slice)

The 21 real artworks in `data/art.ts` span very different aspect ratios
(from a near-square 280×280 piece to a 2000×560 wide panel to tall
502×816 portraits), so a single fixed-size frame image can't wrap all of
them. The fix is a **9-slice frame**: one small frame graphic with
defined corner/edge/center regions that code can stretch to fit *any*
target size without distorting the corners (Phaser supports this
natively via `this.add.nineslice(...)`).

Two frame styles, so different rooms can look distinct: a classic gold
museum frame, and a modern minimal violet-accented frame.

**Cell map:** `[1,1]` = Classic gold frame · `[2,1]` = Modern minimal frame

```
Create two top-down/flat 2D pixel-art picture-frame border tiles,
designed for 9-slice scaling, in a crisp, clean pixel-art style — like
Stardew Valley's decorative object art, NOT a soft/painterly "pixel-ish"
style. Sharp, hard-edged pixels only. Must match a companion character
spritesheet and tileset: same palette family, same single top-left light
source, same 2-3px outline weight.

CANVAS
- Total image size: 384 x 192 pixels, PNG-24, fully transparent background.
- Grid: 2 columns x 1 row, each cell exactly 192 x 192 pixels.
- Each cell is a square picture-frame border with a transparent
  "artwork window" in the middle: the frame border itself should occupy
  a uniform 32px band on all four sides of the 192x192 cell, leaving a
  clean 128x128 transparent square exactly centered in the middle of
  each cell (this transparent window is where a real artwork image gets
  composited in later — it must be fully transparent and precisely
  centered, and matches the 128px base unit used everywhere else in
  this guide).
- The border must be uniform thickness on all 4 sides and each frame's
  corner design must be exactly mirror-symmetric (so it can be
  9-sliced: the 4 corners stay fixed size, the 4 edges tile/stretch
  along their length, without visible distortion when stretched wider
  or taller than the source).

CELL [1,1] — Classic gold museum frame
- An ornate gold/brass frame border (matches the frame-gold accent
  color), with a simple molding profile (a raised outer bevel, a
  slightly recessed inner groove near the artwork window) — think
  traditional museum picture framing, simplified to clean pixel shapes.
  At this larger 32px border thickness you have room for a genuine
  multi-tone molding profile (highlight edge, mid-tone body, shadow
  edge) rather than a single flat gold band.
- Corners should have a small decorative flourish (a simple corner
  medallion shape), consistent and mirrored on all 4 corners.

CELL [2,1] — Modern minimal frame
- A slim, modern frame border in a dark neutral tone (near-black or
  deep charcoal) with a single thin violet accent line (#8b5cf6, muted)
  inset just inside the outer edge, running the full perimeter.
- Flat, minimal corners — no ornamentation, clean 90-degree miters.

TECHNICAL REQUIREMENTS (same as the character sheet)
- Every pixel a single flat color — no anti-aliasing, no gradient
  blending, no soft/blurred edges anywhere, including against the
  transparent background and the transparent center window.
- No dithering that reads as noise at small size.
- Limited, consistent palette: reuse the gold, violet, and outline
  colors already used in the character/tileset sheets.
- Consistent single light source from the top-left (a subtle highlight
  on the top/left edge of the molding, subtle shadow on bottom/right).
- Export at native 384x192, no upscaling/resizing, PNG only (no JPEG).

WHAT TO AVOID
- No text, watermark, grid lines, or labels baked into the image.
- No content inside the transparent center window — it must stay fully
  transparent and precisely centered, not off-axis.
- Border thickness must be even on all 4 sides — no lopsided framing
  (this breaks 9-slice stretching).
- No drop shadow extending outside the 192x192 cell bounds.
```

---

## 7. Wiring finished assets into the code

Once you have the four PNGs saved into `public/game/`, here's what
changes on the code side for each (tell me when you're ready and I'll
make these edits):

- **`character.png`** → replaces `ensurePlaceholderPlayerTexture()` in
  `lib/game/player.ts` with a real `this.load.spritesheet()` call using
  the `CHARACTER_FRAME_WIDTH/HEIGHT/FRAMES_PER_ROW/ROW_ORDER` constants
  already defined there (now updated to 128×128), plus
  `this.anims.create(...)` for a 4-direction walk animation played based
  on movement velocity in `BaseRoomScene.update()`. **This is also the
  point where the room/world scale needs to grow to match** — a 128px
  character next to 16px-thick walls and ~220-320px-wide rooms (current
  `lib/game/rooms.ts` numbers, sized for the ~20px placeholder dot)
  would tower over everything, so wall thickness, room dimensions,
  margins, movement speed, and interaction ranges all need a matching
  rescale at the same time.
- **`tileset.png`** → replaces the flat-color floor/wall rectangles in
  `BaseRoomScene.create()`/`buildWalls()` with `TileSprite` backgrounds
  sized to each room's `width`/`height`; the invisible collision
  rectangles stay exactly as they are (visuals and collision don't need
  to be the same objects).
- **`furniture.png`** → new prop-placement data per room (extends
  `RoomDef` in `lib/game/rooms.ts` with a `props` list), rendered as
  static `Image`s in `BaseRoomScene.create()`.
- **`frames.png`** → replaces the code-drawn violet rectangle border in
  `BaseRoomScene.renderPainting()` with `this.add.nineslice(...)` using
  each artwork's real `imgW`/`imgH` aspect ratio to size the frame
  correctly around it.
