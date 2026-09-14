# mui-image-gallery-viewer

A production-grade image gallery viewer component for React using Material-UI (MUI) with configurable rail positioning, pagination, lazy loading, and multiple transition effects.

## Features

✨ **Configurable Rail Positioning** - Place the thumbnail rail on left, right, top, or bottom
✨ **Multiple Transition Effects** - 9 different animation effects (fade, slide, carousel, cube, flip, rotate, zoom, etc.)
✨ **Smart Pagination** - Automatic pagination for large image sets (10+ images)
✨ **Lazy Loading** - Efficient lazy loading with Intersection Observer
✨ **Responsive Design** - Mobile-first design that works on all screen sizes
✨ **Keyboard Navigation** - Arrow keys for image navigation
✨ **Accessibility** - ARIA labels and semantic HTML
✨ **TypeScript** - Full TypeScript support with comprehensive type definitions
✨ **Theme Integration** - Seamless MUI theme integration with sx props

## Installation

```bash
npm install mui-image-gallery-viewer
# or
yarn add mui-image-gallery-viewer
# or
pnpm add mui-image-gallery-viewer
```

### Peer Dependencies

Make sure you have the following installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Quick Start

```tsx
import { ImageGallery } from "mui-image-gallery-viewer";

const images = [
  {
    id: "1",
    src: "https://example.com/image1.jpg",
    alt: "Image 1",
    thumbnailSrc: "https://example.com/image1-thumb.jpg",
  },
  // ... more images
];

function App() {
  return (
    <ImageGallery
      images={images}
      railPosition="left"
      transitionEffect="fade"
      containerHeight="100vh"
      containerWidth="100%"
    />
  );
}

export default App;
```

## Props

### ImageGallery Props

```typescript
interface ImageGalleryProps {
  // Image data
  images: ImageItem[];

  // Layout
  railPosition?: "left" | "right" | "top" | "bottom"; // default: "left"
  containerHeight?: string | number; // default: "100%"
  containerWidth?: string | number; // default: "100%"

  // Rail styling
  railWidth?: string | number;
  railThickness?: string | number;
  railBackgroundColor?: string;
  railHoverEffect?: boolean; // default: true
  railBorderRadius?: string | number;

  // Transitions
  transitionEffect?:
    | "fade"
    | "slide"
    | "slideover"
    | "carousel"
    | "cube"
    | "flip"
    | "rotate"
    | "zoom"
    | "zoomIn"; // default: "fade"
  transitionDuration?: number; // default: 300 (ms)

  // Pagination
  imagesPerPage?: number; // default: 10
  enablePagination?: boolean; // default: true
  enableLazyLoading?: boolean; // default: true

  // Display
  showCaptions?: boolean; // default: false
  raiseOnHover?: boolean; // default: true

  // Callbacks
  onImageChange?: (image: ImageItem, index: number) => void;
  onPageChange?: (page: number) => void;

  // Styling
  sx?: SxProps<Theme>;
  railSx?: SxProps<Theme>;
  viewerSx?: SxProps<Theme>;
  paginationSx?: SxProps<Theme>;
}
```

### ImageItem

```typescript
interface ImageItem {
  id: string;
  src: string;
  alt: string;
  thumbnailSrc?: string; // Optional: separate thumbnail
  caption?: string; // Optional: caption for image
  loading?: "eager" | "lazy"; // default: "lazy"
}
```

## Rail Positions

The thumbnail rail can be positioned on any side:

```tsx
// Left side (default)
<ImageGallery images={images} railPosition="left" />

// Right side
<ImageGallery images={images} railPosition="right" />

// Top side
<ImageGallery images={images} railPosition="top" />

// Bottom side
<ImageGallery images={images} railPosition="bottom" />
```

## Transition Effects

Nine different animation effects:

```tsx
// Fade transition
<ImageGallery images={images} transitionEffect="fade" />

// Slide transition
<ImageGallery images={images} transitionEffect="slide" />

// Carousel 3D effect
<ImageGallery images={images} transitionEffect="carousel" />

// Cube flip
<ImageGallery images={images} transitionEffect="cube" />

// Full flip
<ImageGallery images={images} transitionEffect="flip" />

// Rotation
<ImageGallery images={images} transitionEffect="rotate" />

// Zoom in/out
<ImageGallery images={images} transitionEffect="zoom" />
<ImageGallery images={images} transitionEffect="zoomIn" />

// Slide over effect
<ImageGallery images={images} transitionEffect="slideover" />
```

## Advanced Usage

### Custom Styling with sx Prop

```tsx
<ImageGallery
  images={images}
  sx={{
    borderRadius: 2,
    boxShadow: 3,
  }}
  railSx={{
    backgroundColor: "#f5f5f5",
  }}
  viewerSx={{
    backgroundColor: "#000",
  }}
/>
```

### Handling Events

```tsx
<ImageGallery
  images={images}
  onImageChange={(image, index) => {
    console.log(`Now viewing image ${index + 1}: ${image.alt}`);
  }}
  onPageChange={(page) => {
    console.log(`Moved to page ${page}`);
  }}
/>
```

### Large Image Sets with Pagination

```tsx
const [images, setImages] = useState<ImageItem[]>([]);

const handlePageChange = async (page: number) => {
  // Fetch images for the page
  const newImages = await fetchImagesForPage(page);
  setImages((prev) => [...prev, ...newImages]);
};

<ImageGallery
  images={images}
  imagesPerPage={10}
  enablePagination={true}
  enableLazyLoading={true}
  onPageChange={handlePageChange}
/>;
```

### Responsive Container

```tsx
<Box sx={{ width: "100%", height: "100vh" }}>
  <ImageGallery
    images={images}
    containerHeight="100%"
    containerWidth="100%"
  />
</Box>
```

## Keyboard Navigation

- **Arrow Left** (←) - Previous image
- **Arrow Right** (→) - Next image
- **Tab** - Navigate between controls
- **Enter/Space** - Select thumbnail

## Accessibility

- Full keyboard navigation support
- ARIA labels on all interactive elements
- Semantic HTML structure
- Screen reader friendly
- Respects `prefers-reduced-motion` setting

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- Material-UI 5.14+
- Framer Motion 11+
- Emotion React & Styled (peer dependencies of MUI)

## Examples

See the [Storybook](https://github.com/ankit-shukla/mui-image-gallery-viewer) for interactive examples of all features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © 2024 Ankit Shukla
