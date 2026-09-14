# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 1.0.1 (2026-09-14)


### Features

* add utility components and GitHub templates ([24de7f5](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/24de7f5b9302422b66b97cd73e208523541d86a2))
* add zoom and download functionality ([2da938e](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/2da938e348909f03b95650a03e99b92d2a8d2a74))


### Bug Fixes

* fix all TypeScript and ESLint errors blocking build ([be43a8e](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/be43a8e3309606adc0fa76c9532d95dcecd720d8))
* remove unused imports, props, and parameters from components ([3b6fb3d](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/3b6fb3d47b8a15cae609bf9399cdc3b8591c40c8))
* resolve peer dependency conflicts and add package-lock.json ([b743c3c](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/b743c3c59aa97a1ee7ee583c12ca892610a55761))
* switch test environment from jsdom to happy-dom to fix CI/CD compatibility ([e225858](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/e2258586f3855665ba1e6f1ab2a41de859e76410))
* update deprecated GitHub Actions to v4 ([018e1d7](https://github.com/ankit-shukla/mui-image-gallery-viewer/commit/018e1d73dc33e699a8944e2d99d6647dacadc7fe))

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
