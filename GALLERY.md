# Adding artwork to the walk-through museum

The floor plan follows an open entrance-to-exit journey: Expression Atrium → Negative Collection → Anime → Screen & Film → Courtside. Adjacent rooms have two-way doors. The Atrium entrance and the final Courtside exit return to the art page. The full guide uses the same connections as the playable rooms.

Exploration stays at a fixed, nearest-neighbour 3× camera scale on desktop and mobile (Mohana is approximately 84 screen pixels tall). The camera follows his centre even at room boundaries, without shrinking to fit the room. Use Floor plan for the complete museum overview; movement and collision remain in native map coordinates.

Mohan introduces the gallery in a personal welcome, with no reading time limit. Choose “Let’s explore” to begin. The thin gold floor line is a simple entrance-to-exit guide with sparse arrows; small gold dots mark artwork viewing areas. Automatic walking still uses a separate, fully collision-aware route around walls, furniture, and ropes, so those necessary detours do not clutter the floor. New hanging positions are included in the safe itinerary automatically. Run `node lib/game/museum-trail.test.cjs` to check the complete route and `node lib/game/scene-lifecycle.test.cjs` to verify shutdown/destroy cleanup.

Gallery overlays use regular rectangular panels with modest rounded corners, without clouds or trailing bubbles. The intro is a bottom-aligned conversation panel with Mohan's portrait, speaker name, and first-person welcome. It waits for “Let’s explore” and keeps keyboard focus inside. Artwork previews, the original viewer, floor plan, and interaction hints use regular cards.

The nine Jim Carrey studies have individual expression-based titles and editorial descriptions in `data/art.ts` (`jimCarreyStudies`). These are descriptions of the drawings, not quotations or inferred film-scene identifications. The same text appears in the museum and main-page collage.

All four negative artworks form the premium collection, behind collision-aware velvet ropes. Courtside has Giannis on the players’ wall and Air Jordan in the sneaker alcove. Two empty player bays are reserved for future uploads, not additional artworks. The Anime wing uses wanted-poster and manga-panel details, informed by the public `_dead_stone_` Instagram grid.

Section furnishings are defined and drawn at native pixel scale in `lib/game/galleryFurnishings.ts`: Courtside has two hoops with nets, a basketball rack, dumbbells, lockers, and a water cooler; the atrium has an easel, supplies table, and catalogue stand; premium has a brass lamp, display plinth, and catalogue stand; anime has manga shelves, a figure display, and a lantern; Screen & Film has a movie camera, reel cabinet, and clapperboard. Their shared floor footprints feed physics, route planning, and floor-plan markers. Keep the simple gold guide and artwork viewing spots clear when moving them.

1. Put the new image in `public/art/` (PNG, JPG or WebP).
2. Add an entry to `data/gallery-additions.ts`. Use a unique ID of 1000 or higher.
3. Choose an unused display-wall position. The one-cell thumbnail, enlarged framed view, floor plan marker and discovery total update automatically. No atlas rebuild is required.

Example entry inside `galleryAdditions`:

```ts
{
  room: 'sports', x: 432, y: 64,
  art: {
    id: 1000, title: 'Your artwork title', image: '/art/new-piece.png',
    description: 'Your description.', category: 'Sports', year: '2026',
    imgW: 800, imgH: 1000, hasNegative: false,
  },
}
```

Available positions in the current layout (choose each at most once):

| Room | x | y |
| --- | ---: | ---: |
| portraits | 384 | 64 |
| portraits | 80 | 288 |
| portraits | 208 | 288 |
| lobby | 224 | 416 |
| anime | 432 | 320 |
| screenfilm | 160 | 320 |
| sports | 432 | 64 |
| sports | 496 | 64 |

Existing IDs and overlapping artwork positions are rejected. More walls/rooms require extending `lib/game/rooms.ts` and checking the viewing paths; images are not silently squeezed into occupied positions. This list is a deliberate set of expansion bays, not unlimited wall space.

Set `hasNegative: true` to offer the optional negative switch in the original-image viewer. Museum walls and nearby previews show the actual artwork without inversion, including the premium collection. Existing premium previews use the unfiltered multi-cell frames; their wall thumbnails are drawn directly from the source images instead of the inverted atlas. Getting close to artwork shows a regular popup with its image, title, and description, regardless of facing or movement; walking away dismisses it. Clicking this preview or pressing E opens the original local image (unfiltered by default), with its full description and an optional negative switch. New local images use automatically generated 32×32 thumbnails; their preview and original viewer preserve aspect ratio.

Controls: click the floor to walk; click a painting to approach its viewing spot; arrow keys/WASD cancel automatic walking; E interacts with nearby paintings, benches and guide stands. Click a bench to sit; move or press E to stand. The entrance can be skipped and honours reduced-motion preferences. The floor plan always includes every room.
