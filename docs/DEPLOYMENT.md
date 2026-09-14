# Deployment & Publishing Guide

Complete guide for building, testing, and publishing the `mui-image-gallery-viewer` package.

## Table of Contents

1. [Local Development](#local-development)
2. [Building the Package](#building-the-package)
3. [Testing](#testing)
4. [Publishing to npm](#publishing-to-npm)
5. [Storybook Deployment](#storybook-deployment)
6. [CI/CD Workflows](#cicd-workflows)
7. [Troubleshooting](#troubleshooting)

## Local Development

### Prerequisites

- Node.js 18+
- npm 8+
- Git

### Initial Setup

```bash
# Clone repository
git clone https://github.com/ankit-shukla/mui-image-gallery-viewer.git
cd mui-image-gallery-viewer

# Install dependencies
npm install

# Start development server (optional)
npm run dev

# Start Storybook for interactive development
npm run storybook
```

Storybook will open at `http://localhost:6006`

## Building the Package

### Development Build

```bash
# Quick build without full QA
npm run build:fast
```

Output: `dist/` directory with:
- `mui-image-gallery-viewer.es.js` - ESM bundle
- `index.d.ts` - TypeScript declarations
- Source maps for debugging

### Production Build (Recommended)

```bash
# Full build with lint, test, and build
npm run build
```

This runs:
1. `npm run lint` - Check code style
2. `npm run test -- run` - Run all tests
3. `vite build` - Build bundle

Only proceeds if all checks pass.

### Build Artifacts

```
dist/
├── mui-image-gallery-viewer.es.js    # ESM bundle (~50KB)
├── mui-image-gallery-viewer.es.js.map  # Source map
├── index.d.ts                        # Root types
├── components/
│   └── *.d.ts                       # Component types
├── hooks/
│   └── *.d.ts                       # Hook types
└── shared/
    └── *.d.ts                       # Shared types
```

## Testing

### Run Tests

```bash
# Watch mode (during development)
npm run test

# Single run (CI mode)
npm run test -- run

# Interactive UI
npm run test:ui

# Coverage report
npm run coverage
```

### Test Files

Tests are located alongside components:
- `src/**/*.test.tsx` - Component tests
- `src/**/*.test.ts` - Hook/helper tests

### Coverage Thresholds

- Statements: 70%+
- Branches: 60%+
- Functions: 70%+
- Lines: 70%+

## Publishing to npm

### Prerequisites

1. **npm Account**: https://www.npmjs.com/signup
2. **npm Token**: Generated at https://www.npmjs.com/settings/username/tokens
3. **GitHub Secret**: `NPM_TOKEN` configured in repository

### Package Information

**Package Name**: `mui-image-gallery-viewer`  
**Repository**: https://github.com/ankit-shukla/mui-image-gallery-viewer  
**npm URL**: https://www.npmjs.com/package/mui-image-gallery-viewer

### Publishing Process

#### Option 1: Automated (Recommended)

The easiest way using GitHub Actions:

```bash
# 1. Update version and changelog
npm run release:patch   # or :minor or :major

# 2. Push to GitHub with tags
git push origin main --tags

# 3. GitHub Actions automatically:
#    - Runs tests
#    - Builds package
#    - Publishes to npm
#    - Creates GitHub Release
```

This triggers `.github/workflows/publish-npm.yml`

#### Option 2: Manual Publishing

If you need to publish locally:

```bash
# 1. Build the package
npm run build

# 2. Verify it's ready
npm pack  # Creates .tgz file locally

# 3. Publish
npm publish

# 4. Verify
npm view mui-image-gallery-viewer
```

### Version Numbering

Use Semantic Versioning (MAJOR.MINOR.PATCH):

```bash
# Patch: Bug fixes (1.0.0 → 1.0.1)
npm run release:patch

# Minor: New features, backwards compatible (1.0.0 → 1.1.0)
npm run release:minor

# Major: Breaking changes (1.0.0 → 2.0.0)
npm run release:major
```

### Pre-Release Versions

For alpha, beta, or RC versions:

```bash
npm version prerelease --preid=alpha
# Results in: 1.0.0-alpha.0

git push origin main --tags
```

## Storybook Deployment

### Local Storybook

```bash
# Start Storybook development server
npm run storybook
```

Opens at `http://localhost:6006`

### Build Storybook

```bash
# Create static Storybook site
npm run build-storybook
```

Output: `storybook-static/` directory

### GitHub Pages Deployment

Automated by `.github/workflows/build-storybook.yml`:

1. Runs on every push to `main`
2. Builds Storybook
3. Deploys to `gh-pages` branch
4. Available at: https://ankit-shukla.github.io/mui-image-gallery-viewer/

#### Manual Deployment

If you need to deploy manually:

```bash
# 1. Build Storybook
npm run build-storybook

# 2. Deploy to GitHub Pages
npx gh-pages -d storybook-static

# Or manually push to gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r storybook-static/* .
git add .
git commit -m "Deploy Storybook"
git push origin gh-pages
```

## CI/CD Workflows

### Available Workflows

#### 1. publish-npm.yml

**Trigger**: Push to `main` or version tag  
**Actions**:
1. Install dependencies
2. Run linting
3. Run tests
4. Build package
5. Publish to npm (on version tags only)
6. Create GitHub Release

**Secrets Required**:
- `NPM_TOKEN` - npm authentication token

#### 2. build-storybook.yml

**Trigger**: Push to `main`  
**Actions**:
1. Install dependencies
2. Build Storybook
3. Deploy to GitHub Pages

**Configuration**:
- Runs on every push to `main`
- Uses GitHub Actions permissions for Pages deployment

### Viewing Workflow Status

1. Go to **Actions** tab in repository
2. Click workflow run
3. View job logs for each step

## Code Quality Checklist

Before publishing, ensure:

- [ ] `npm run lint` - No linting errors
- [ ] `npm run test -- run` - All tests passing
- [ ] `npm run build` - Builds successfully
- [ ] Updated `CHANGELOG.md` - Describes changes
- [ ] Updated `README.md` - For new features
- [ ] Updated `CLAUDE.md` - For architecture changes
- [ ] No console errors/warnings in Storybook
- [ ] TypeScript types are accurate

## Troubleshooting

### npm Publishing Fails

**Error**: `401 Unauthorized`

**Solution**:
```bash
# Re-authenticate with npm
npm login

# Or update GitHub secret
# 1. Generate new token at npm
# 2. Update NPM_TOKEN in GitHub Secrets
# 3. Retry workflow
```

**Error**: `You do not have permission to publish`

**Solution**:
- Verify package name doesn't already exist
- Check npm account has publish permissions
- Ensure npm token has publish scope

### Storybook Not Deploying

**Symptom**: No updates on GitHub Pages

**Solution**:
1. Check **Actions** tab for workflow errors
2. Verify `gh-pages` branch exists (created by workflow)
3. Check **Settings > Pages** points to `gh-pages` branch
4. Clear browser cache and refresh

### Build Fails Locally

**Error**: Tests fail

**Solution**:
```bash
npm run test -- run  # Get detailed error

# Fix issues, then retry
npm run build
```

**Error**: TypeScript errors

**Solution**:
```bash
npx tsc --noEmit  # Show all TS errors

# Fix typing issues
npm run lint:fix  # Auto-fix if possible
```

### Workflow Logs

Access workflow details:

1. Go to **Actions** tab
2. Click workflow run
3. Click job to expand
4. View logs for each step

Common log locations:
- **Install dependencies**: `npm ci` output
- **Linting**: ESLint output
- **Testing**: Vitest output
- **Building**: Vite build output
- **Publishing**: npm publish output

## Performance Metrics

### Bundle Size

Target: < 100KB gzipped

Current (example):
- `mui-image-gallery-viewer.es.js`: ~50KB
- Minified + gzipped: ~15KB

### Build Time

- Development build: ~2 seconds
- Production build (with tests): ~30 seconds
- Storybook build: ~60 seconds

### Test Duration

- Test suite: ~5-10 seconds
- Coverage report: ~10-15 seconds

## Release Checklist

Before releasing:

- [ ] Pull latest `main`
- [ ] Run `npm install`
- [ ] Run `npm run build` (full QA)
- [ ] Verify builds and tests pass
- [ ] Update documentation
- [ ] Update CHANGELOG
- [ ] Create version tag: `npm run release:patch`
- [ ] Push with tags: `git push origin main --tags`
- [ ] Verify GitHub Actions workflow succeeds
- [ ] Confirm package on npm: `npm view mui-image-gallery-viewer`
- [ ] Verify Storybook deployment
- [ ] Create GitHub Release notes

## Support

For issues or questions:

1. Check existing issues: https://github.com/ankit-shukla/mui-image-gallery-viewer/issues
2. Create new issue with details
3. Review [CONTRIBUTING.md](../CONTRIBUTING.md)
4. See [CLAUDE.md](../CLAUDE.md) for architecture details
