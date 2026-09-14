# CLAUDE.md - MUI Image Gallery Viewer

This file provides guidance for Claude Code when working in the `mui-image-gallery-viewer` package.

## Project Overview

`mui-image-gallery-viewer` is a production-grade React component library that provides an image gallery viewer with configurable rail positioning, multiple transition effects, pagination, and lazy loading. It's built with TypeScript, MUI Material, and Framer Motion.

**Package**: `mui-image-gallery-viewer`  
**Repository**: https://github.com/ankit-shukla/mui-image-gallery-viewer  
**NPM**: https://www.npmjs.com/package/mui-image-gallery-viewer

## Stack & Versions

- **React**: 18+
- **MUI Material**: 5.14+ or 6.0+
- **TypeScript**: 5.0+
- **Vite**: 5.0+ (build tool)
- **Storybook**: 8.0+ (documentation)
- **Framer Motion**: 11.0+ or 12.0+ (animations)
- **Vitest**: 0.34+ (testing)

## Project Structure

```
src/
├── components/                # React components
│   ├── ImageGallery/         # Main component (orchestrator)
│   ├── GalleryRail/          # Thumbnail rail container
│   ├── RailImage/            # Individual thumbnail
│   ├── ImageViewer/          # Main image display area
│   ├── PaginationBar/        # Page number navigation
│   └── TransitionWrapper/    # Animation wrapper
├── hooks/                     # Custom React hooks
│   ├── useImageGalleryState.ts
│   ├── useLazyLoading.ts
│   ├── usePagination.ts
│   └── useTransition.ts
├── shared/
│   ├── constants/            # Configuration constants
│   │   ├── gallery.ts       # Gallery defaults
│   │   └── transitions.ts   # Animation timings
│   ├── helpers/             # Utility functions
│   │   ├── imageValidation.ts
│   │   ├── railPositioning.ts
│   │   ├── paginationCalculator.ts
│   │   └── transitionSelector.ts
│   └── types/              # TypeScript interfaces
│       └── gallery.types.ts
├── index.tsx               # Package entry point
└── index.stories.tsx       # Storybook stories
```

## Key Concepts

### Rail Positioning

The `railPosition` prop determines thumbnail placement (left/right/top/bottom). Internally, helper functions in `railPositioning.ts` calculate appropriate flex layouts and dimensions for each orientation.

**Relevant files**:
- `src/shared/helpers/railPositioning.ts` - Layout calculation functions
- `src/components/GalleryRail/GalleryRail.styled.ts` - Position-aware styling

### Transition Effects

Nine different animation effects using Framer Motion and CSS 3D transforms. Each effect has configurable duration and direction-awareness (forward/backward).

**Relevant files**:
- `src/shared/constants/transitions.ts` - Effect registry and durations
- `src/shared/helpers/transitionSelector.ts` - Variant generators
- `src/components/TransitionWrapper/TransitionWrapper.tsx` - Animation engine

### Pagination & Lazy Loading

Images beyond `imagesPerPage` (default 10) trigger pagination UI. Lazy loading uses Intersection Observer to detect when the user scrolls near the end of the rail.

**Relevant files**:
- `src/hooks/useLazyLoading.ts` - Intersection Observer hook
- `src/hooks/usePagination.ts` - Pagination calculations
- `src/shared/helpers/paginationCalculator.ts` - Page math
- `src/components/PaginationBar/PaginationBar.tsx` - Page buttons
- `src/components/GalleryRail/GalleryRail.tsx` - Orchestration

### State Management

All state (current image, page, transition direction) is managed in `useImageGalleryState`. This hook is the single source of truth for gallery state.

**Relevant file**:
- `src/hooks/useImageGalleryState.ts`

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (for testing in isolation)
npm run dev

# Start Storybook (interactive documentation)
npm run storybook

# Build library (ESM format)
npm run build:fast

# Build and test (full QA)
npm run build

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Coverage report
npm run coverage

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Release a new version
npm run release:patch    # Patch version (1.0.0 → 1.0.1)
npm run release:minor    # Minor version (1.0.0 → 1.1.0)
npm run release:major    # Major version (1.0.0 → 2.0.0)
```

## Code Conventions

### Import Order

1. React/MUI imports
2. Relative component imports (using `@components`, `@hooks`, `@shared` aliases)
3. Styled components

Example:
```typescript
import React, { FC } from "react";
import { Box } from "@mui/material";
import GalleryRail from "@components/GalleryRail/GalleryRail";
import { ImageGalleryProps } from "@shared/types/gallery.types";
import { GalleryContainer } from "./ImageGallery.styled";
```

### Component Structure

1. Styled components (separate `.styled.ts` file)
2. Component implementation (`.tsx` file)
3. Tests (`.test.tsx` file)
4. Stories (`.stories.tsx` file)

### Typing

- Use `FC<Props>` for functional components
- Define all prop interfaces in `@shared/types/gallery.types.ts`
- Use `SxProps<Theme>` for sx prop support
- No `any` types

### Styling Approach

- Use MUI's `styled()` from `@mui/material/styles`
- All components styled via styled-components (no CSS modules)
- Respect MUI theme tokens (colors, spacing, breakpoints)
- Support `sx` prop on public components for customization

### Component Memoization

- Memoize custom components that receive objects/arrays as props
- Use `useMemo` for computed values that are JSX props
- Use `useCallback` for event handlers passed to children

## Build & Publishing

### Build Output

```
dist/
├── mui-image-gallery-viewer.es.js    # ESM bundle
├── index.d.ts                         # TypeScript declarations
└── *.d.ts                            # Individual component types
```

### npm Publishing

Requires `NPM_TOKEN` in GitHub Actions secrets. The token can be generated at https://www.npmjs.com/settings/username/tokens

Publishing flow:
1. Create a new git tag: `git tag v1.0.0`
2. Push to main: `git push origin main --tags`
3. GitHub Actions builds, tests, and publishes
4. Creates a GitHub Release automatically

### Storybook Deployment

Storybook builds and deploys to GitHub Pages on every push to main. Accessible at `https://username.github.io/mui-image-gallery-viewer/`

## Testing Strategy

### Test Files

- `src/index.test.tsx` - Integration tests for ImageGallery
- `src/shared/helpers/*.test.ts` - Unit tests for utilities
- `src/components/*/*.test.tsx` - Component tests (snapshot, interaction, accessibility)

### Vitest Configuration

- Environment: jsdom
- Coverage provider: v8
- Reporters: text, json, html

### Running Tests

```bash
npm run test              # Watch mode
npm run test -- run       # Single run (CI mode)
npm run coverage          # Coverage report
npm run test:ui           # Interactive UI
```

## Key Files for Enhancement

When adding features, these files are typically involved:

| Feature | Files |
|---------|-------|
| New transition effect | `src/shared/constants/transitions.ts`, `src/shared/helpers/transitionSelector.ts` |
| New prop/option | `src/shared/types/gallery.types.ts`, `src/components/ImageGallery/ImageGallery.tsx` |
| New hook | `src/hooks/useXxx.ts`, then export in `src/index.tsx` |
| New component | Create `src/components/XxxComponent/`, implement, test, add stories |
| Bug fix | Locate in above files, write test case, verify test passes |

## Common Workflows

### Adding a New Component

1. Create `src/components/ComponentName/` directory
2. Create `ComponentName.styled.ts` with styled components
3. Create `ComponentName.tsx` with component logic
4. Create `ComponentName.test.tsx` with tests
5. Create `ComponentName.stories.tsx` with Storybook story
6. Export in `src/index.tsx`

### Adding a New Transition Effect

1. Add effect name to `TRANSITION_EFFECTS` in `src/shared/constants/transitions.ts`
2. Add duration to `TRANSITION_DURATIONS` in same file
3. Add variant object to `getTransitionVariants()` in `src/shared/helpers/transitionSelector.ts`
4. Create story in `src/index.stories.tsx` to demonstrate
5. Write tests for animation correctness

### Fixing an Issue

1. Write a failing test case that reproduces the issue
2. Verify test fails
3. Implement fix
4. Verify test passes
5. Run full test suite: `npm run test -- run`
6. Commit with clear message

## Accessibility Requirements

- All interactive elements must have ARIA labels
- Keyboard navigation must work (arrow keys for images)
- Focus management must be handled properly
- Respect `prefers-reduced-motion` (handled in `useTransition` hook)
- Semantic HTML: use buttons for buttons, not divs

## Performance Considerations

- Memoize thumbnail components to prevent unnecessary re-renders
- Use Intersection Observer for lazy loading (not scroll events)
- Debounce rapid image selection
- Framer Motion GPU acceleration for smooth 60fps animations
- Optimize image sizes (use thumbnails for rail, full-size for viewer)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Animations stutter | Reduce transition duration, check GPU acceleration |
| Images blurry in rail | Use `thumbnailSrc` with optimized size |
| Lazy loading not triggering | Verify `railRef` is properly connected to rail container |
| Types not working | Check `@shared/types/gallery.types.ts` exports |
| Storybook won't build | Run `npm install` and `npm run build-storybook` |

## References

- [MUI Documentation](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Storybook Docs](https://storybook.js.org/)

## Future Enhancements

Potential features for future versions:

- [ ] Touch swipe gesture support
- [ ] Keyboard shortcuts documentation
- [ ] Image zoom/pan functionality
- [ ] Download image button
- [ ] Social sharing integration
- [ ] Custom thumbnail sizes
- [ ] Image filters/effects
- [ ] Lightbox mode
- [ ] Mobile optimization improvements
