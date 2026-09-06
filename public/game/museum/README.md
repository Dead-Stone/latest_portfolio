# SignedbyMMS multicell museum artwork

29 framed artworks built from the original images on https://www.signedbymms.com/art. Artwork is no longer constrained to a single map tile. The map grid remains 32 x 32 px.

## Dimensions

- Narrow portraits: 96 x 128 px, occupying 3 x 4 cells.
- Square and broader portraits: 128 x 128 px, occupying 4 x 4 cells.
- Landscape compositions: 160 x 128 px, occupying 5 x 4 cells.

Each drawing retains its original aspect ratio and full composition inside a fitted frame and mat. Transparent padding brings the complete asset to an exact multiple of 32 px. The sizes are placement defaults, not a one-cell restriction. The artwork has been resampled directly from the website originals at its new size, not enlarged from the earlier small thumbnails.

## Negative filter

The default files apply RGB inversion (`255 - channel`) to **Jack Nicholson, Heath Ledger, Joaquin Phoenix, and White cat study**. The inversion occurs before the final shared-palette conversion. Frames, cream mats, and transparency are not inverted. Other artworks receive no inversion.

`unfiltered-negatives/` contains the corresponding four unfiltered versions at exactly the same dimensions and alignment. Swap the image to toggle the effect; do not add another inversion to the already filtered default texture. The JSON manifest identifies filtered pieces with `negative: true` and lists both file paths.

## Import

- `frames/`: 29 standalone transparent PNGs, one complete framed artwork per file.
- `signedbymms-multicell-atlas.png`: 1024 x 512 transparent atlas. All artwork bounds start on the 32 px grid; use the JSON rectangles, since objects have different widths.
- `signedbymms-multicell.json`: title, source URL, pixel rectangle, cell rectangle, inner artwork rectangle, and filter state for each piece.
- `signedbymms-art-objects.tsx`: Tiled image collection. Place the complete artwork as a tile object. It uses bottom-left object alignment.
- `signedbymms-art-grid32.tsx`: the same atlas sliced into 32 x 32 cells for tile-by-tile painting or stamps. Select the whole cell rectangle of an artwork to place it intact.
- `museum-environment.png` / `.tsx`: 32 px museum walls, floors and props. The old single-cell paintings were cleared from this version. Added tall-wall fill and crown tiles support larger artwork.
- `museum-multicell-example.tmx`: 30 x 20 map using separate floor, wall, rug, furniture and framed-art layers.
- `museum-multicell-example.png`: 960 x 640 sample gallery with Mohana shown for scale. The player is a preview overlay, not part of the Tiled map.
- `signedbymms-multicell-preview.png`: all 29 pieces on a cream inspection background. Use the transparent atlas or individual frames in the game.

Keep texture filtering on Nearest/Point, mipmaps off, and use integer display scaling. All final frame pixels have alpha 0 or 255 and use at most 64 opaque colors across the set. No smoothing is used at the frame boundaries. The environment retains its own palette. Wall art does not need its own collision rectangle; use the wall collision behind it.

Frame IDs and source order are unchanged from the previous 29-piece collection. The compact one-cell sheets from the previous version are not part of this updated package.
