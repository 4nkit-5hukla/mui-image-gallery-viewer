# Contributing to mui-image-gallery-viewer

Thank you for your interest in contributing! We welcome contributions of all kinds including bug reports, feature requests, documentation improvements, and code changes.

## Code of Conduct

Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mui-image-gallery-viewer.git
   cd mui-image-gallery-viewer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Start Storybook for interactive testing:
   ```bash
   npm run storybook
   ```

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feat/feature-name` for new features
- `fix/bug-name` for bug fixes
- `docs/update-name` for documentation
- `refactor/component-name` for refactoring

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Run `npm run lint:fix` before committing
- Format with Prettier: `npm run lint:fix`

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add zoom functionality
fix: correct pagination calculation
docs: update README with examples
refactor: simplify transition logic
test: add tests for zoom hook
```

### Testing

1. Write tests for new features
2. Ensure all tests pass:
   ```bash
   npm run test -- run
   ```
3. Check coverage:
   ```bash
   npm run coverage
   ```

### Documentation

- Update README.md for new features
- Update CLAUDE.md if changing architecture
- Add JSDoc comments for public APIs
- Update CHANGELOG.md (maintainers will do this)

## Pull Request Process

1. Update your branch with the latest main:
   ```bash
   git pull origin main
   ```
2. Ensure all tests pass locally:
   ```bash
   npm run build
   npm run test -- run
   ```
3. Push to your fork and create a Pull Request
4. Use the PR template to describe changes
5. Ensure CI checks pass
6. Address any review comments

## Reporting Bugs

When reporting bugs, include:

- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser and OS information
- React and MUI versions
- Package version

Use the [Bug Report](/.github/ISSUE_TEMPLATE/bug_report.md) template.

## Requesting Features

When suggesting features, include:

- Clear description of the feature
- Use case or problem it solves
- Proposed solution
- Example code if applicable

Use the [Feature Request](/.github/ISSUE_TEMPLATE/feature_request.md) template.

## Project Structure

Key directories:
- `src/components/` - React components
- `src/hooks/` - Custom hooks
- `src/shared/` - Types, helpers, constants
- `.storybook/` - Storybook configuration
- `.github/workflows/` - GitHub Actions CI/CD

See [CLAUDE.md](./CLAUDE.md) for detailed architecture information.

## Development Commands

```bash
# Development
npm run dev                 # Start dev server
npm run storybook         # Start Storybook

# Building
npm run build             # Full build (lint + test + build)
npm run build:fast        # Quick build

# Testing
npm run test              # Watch mode
npm run test -- run       # Single run
npm run test:ui          # Interactive UI
npm run coverage          # Coverage report

# Linting
npm run lint              # Check code
npm run lint:fix          # Fix issues

# Releasing
npm run release:patch     # Patch version
npm run release:minor     # Minor version
npm run release:major     # Major version
```

## Release Process (Maintainers)

1. Update version and changelog:
   ```bash
   npm run release:patch    # or minor/major
   ```
2. Push with tags:
   ```bash
   git push origin main --tags
   ```
3. GitHub Actions automatically publishes to npm
4. Storybook deploys to GitHub Pages

## Areas for Contribution

- 🐛 **Bug fixes** - Fix reported issues
- ✨ **Features** - Add new functionality
- 📖 **Documentation** - Improve docs and examples
- 🧪 **Tests** - Increase test coverage
- ♿ **Accessibility** - Improve a11y
- 🎨 **Styles** - Enhance visual design
- ⚡ **Performance** - Optimize speed

## Questions?

- Open an issue for questions
- Check existing issues for answers
- Review [CLAUDE.md](./CLAUDE.md) for architecture details
- Check [README.md](./README.md) for usage

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
