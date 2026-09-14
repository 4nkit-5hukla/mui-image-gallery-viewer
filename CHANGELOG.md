# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added

- Initial release of mui-image-gallery-viewer
- Image Gallery component with configurable rail positioning (left, right, top, bottom)
- 9 transition effects: fade, slide, slideover, carousel, cube, flip, rotate, zoom, zoomIn
- Smart pagination for large image sets (10+ images)
- Lazy loading with Intersection Observer
- Page number navigation with ellipsis support
- Next/Previous image buttons
- Keyboard navigation (arrow keys)
- Caption support for images
- Full TypeScript support
- MUI theme integration with sx prop support
- Comprehensive Storybook documentation
- Full test coverage with Vitest
- GitHub Actions CI/CD workflows
- npm package publishing
- GitHub Pages deployment for Storybook

### Components

- `ImageGallery` - Main component that orchestrates the gallery
- `GalleryRail` - Thumbnail rail with pagination
- `RailImage` - Individual thumbnail component
- `ImageViewer` - Main image display area
- `PaginationBar` - Page number navigation
- `TransitionWrapper` - Animation wrapper with Framer Motion

### Hooks

- `useImageGalleryState` - Gallery state management
- `useLazyLoading` - Lazy loading with Intersection Observer
- `usePagination` - Pagination calculations
- `useTransition` - Transition effect management

### Features

- Responsive design (mobile-first)
- Accessibility (ARIA labels, keyboard navigation, screen reader support)
- Respects `prefers-reduced-motion`
- Image thumbnail support (separate thumbnailSrc from src)
- Customizable colors and styling via sx props
- Loading indicators for pagination
- Support for large image datasets
