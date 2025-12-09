# Art Gallery Images

Place your art images in this directory.

## Naming Convention
- Use descriptive names: `digital-art-1.jpg`, `illustration-sunset.png`, etc.
- Supported formats: JPG, PNG, GIF, WEBP

## Instructions
1. Add your art images to this folder
2. Update the `artPieces` array in `app/art/page.tsx` with:
   - Title of your artwork
   - Description
   - Image path (e.g., `/art/your-image.jpg`)
   - Category (Digital Art, Illustration, Photography, Traditional, etc.)
   - Year created

## Example Entry
```javascript
{
  id: 1,
  title: 'Sunset Dreams',
  description: 'A digital painting exploring warm color palettes',
  image: '/art/sunset-dreams.jpg',
  category: 'Digital Art',
  year: '2024'
}
```


