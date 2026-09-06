# Interactive museum
Open /art and choose **Walk through the gallery**.

## Current assets and behavior
- `character.png`: 128 x 128 sheet, sixteen 32 x 32 animation frames; down, left, right, up.
- `museum/art-map-32.png`: 256 x 128 atlas, 29 artwork thumbnails in 32 x 32 cells. Each painting uses one map cell by default.
- `museum/frames/`: detailed 96 x 128, 128 x 128, or 160 x 128 framed drawings opened when selected. These are separately rendered assets, not scaled thumbnails.
- `museum/unfiltered-negatives/`: alternative views for three Joker portraits and the cat study. The default artwork has its negative filter baked in; the viewer switches files to preserve frame and mat colors.
- `museum/museum-environment.png`: 32 px floor, wall, rug, furniture, plant and exhibit tiles.
- `museum/signedbymms-multicell.json`: artwork IDs, source images, and frame rectangles. The mapping uses source filenames, because portfolio artwork IDs differ from asset IDs.
- Tiled XML files are retained for editing and excluded from TypeScript compilation; the running game uses room definitions in `lib/game/rooms.ts`.

## Layout
Five connected rooms contain all 29 drawings, including the nine Jim Carrey studies. The marble atrium has a cross-shaped footprint, the walnut portrait wing is L-shaped, the Anime wing is stepped, the slate cinema wing has staggered alcoves, and the study room has clipped corners. Related artworks are grouped 80–128 map pixels apart. Freestanding display walls, route inlays, benches, sculpture islands, planted corners and display cabinets create different paths in each room.

The Floor plan shows the complete museum: actual room footprints, display walls, all 29 artwork markers, furniture, door connections, internal routes, and the current player position. It is derived from the same room definitions as the live scene. Rooms on the plan and the room buttons support direct navigation. Physical door transitions remain available.

Use WASD/arrows to walk; E near a painting or click/tap it to open its multicell view. The Floor plan menu provides direct access to every wing. Escape closes the viewer or map before leaving the gallery. Touch controls appear on coarse-pointer devices. Movement pauses while a viewer or floor plan is open.

Textures use nearest filtering and integer camera zoom. Physics uses small foot collision boxes and base collisions for furniture. Original artwork and the existing portfolio collection remain available through Art World.
