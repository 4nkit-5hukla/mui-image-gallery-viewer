# GitHub Repository Setup Guide

This guide walks through setting up the `mui-image-gallery-viewer` GitHub repository for public use.

## Prerequisites

- GitHub account
- Repository already created as `ankit-shukla/mui-image-gallery-viewer`
- Local git repository initialized

## Step 1: Add Remote Repository

```bash
cd /Users/ankit/Projects/easysocial/mui-image-gallery-viewer
git remote add origin https://github.com/ankit-shukla/mui-image-gallery-viewer.git
git branch -M main
git push -u origin main
```

## Step 2: Configure GitHub Secrets for npm Publishing

1. Go to **Settings > Secrets and variables > Actions**
2. Click "New repository secret"
3. Add secret:
   - **Name**: `NPM_TOKEN`
   - **Value**: Your npm authentication token (from https://www.npmjs.com/settings/username/tokens)

To get your npm token:
1. Go to https://www.npmjs.com/settings/username/tokens
2. Create a new token (Automation type recommended)
3. Copy the token and add to GitHub Secrets

## Step 3: Configure GitHub Pages for Storybook

1. Go to **Settings > Pages**
2. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (this will be created automatically by the workflow)
   - **Folder**: `/ (root)`
3. Save

The workflow `.github/workflows/build-storybook.yml` automatically handles the deployment.

## Step 4: Enable Actions

1. Go to **Actions** tab
2. Workflows are pre-configured:
   - `publish-npm.yml` - Publishes to npm on version tags
   - `build-storybook.yml` - Deploys Storybook to GitHub Pages
3. Workflows are enabled by default

## Step 5: Configure Branch Protection (Optional)

For production-grade safety:

1. Go to **Settings > Branches**
2. Add rule for `main`:
   - Require pull request reviews before merging
   - Require status checks to pass (CI)
   - Require branches to be up to date
   - Allow auto-merge

## Step 6: Configure Issue/PR Templates

Templates are already in place:
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/pull_request_template.md`

They automatically appear when creating issues/PRs.

## Step 7: Set Repository Topics

Go to **Settings > About** and add topics:
- `react`
- `component-library`
- `gallery`
- `image-viewer`
- `mui`
- `material-ui`
- `typescript`

## Step 8: Configure Dependabot (Optional)

Dependabot configuration is already in `.github/dependabot.yml`. It will:
- Check for npm updates weekly
- Create pull requests for dependency updates
- Auto-assign to you for review

To enable or modify:
1. Go to **Settings > Code security and analysis**
2. Ensure "Dependabot version updates" is enabled

## Step 9: Set Up Default Branch Settings

1. Go to **Settings > Branches**
2. Set default branch to `main`
3. Under "Merge button":
   - Allow squash merging (recommended)
   - Allow auto-merge
   - Auto-delete head branches

## Step 10: First Release

After everything is configured, create your first release:

```bash
# Make sure everything is committed
npm run build
npm run test -- run

# Create version tag
npm run release:patch

# Push with tags
git push origin main --tags
```

This will:
1. Update package version in `package.json`
2. Generate/update `CHANGELOG.md`
3. Create a git tag
4. Push to GitHub
5. GitHub Actions automatically:
   - Publishes to npm
   - Builds Storybook
   - Deploys to GitHub Pages
   - Creates GitHub Release

## Troubleshooting

### npm Publishing Fails

**Issue**: `401 Unauthorized` when publishing

**Solution**:
1. Verify `NPM_TOKEN` is set correctly in GitHub Secrets
2. Ensure token has publish permissions
3. Check package name in `package.json` is available on npm

### Storybook Not Deploying

**Issue**: No Storybook updates on GitHub Pages

**Solution**:
1. Go to **Actions** tab
2. Check `build-storybook.yml` workflow logs
3. Verify `gh-pages` branch was created
4. Check **Settings > Pages** configuration

### CI Failing

**Issue**: GitHub Actions workflows fail

**Solution**:
1. Go to **Actions** tab
2. Click failed workflow
3. Check logs for specific errors
4. Common issues:
   - Dependencies not installing: run `npm install --legacy-peer-deps` locally
   - Tests failing: run `npm run test -- run` locally
   - Linting errors: run `npm run lint:fix` locally

## Environment Variables for npm

Create `.npmrc` file in home directory (if not already present):

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

This allows npm publish to work with `NPM_TOKEN` environment variable.

## Accessing Published Package

After first successful release:

```bash
npm install mui-image-gallery-viewer
# or
yarn add mui-image-gallery-viewer
```

Package homepage: https://www.npmjs.com/package/mui-image-gallery-viewer

## Accessing Storybook

After successful Storybook deployment:

https://ankit-shukla.github.io/mui-image-gallery-viewer/

## Maintenance

### Regular Updates

```bash
# Weekly: Check for dependency updates
# Dependabot automatically creates PRs

# Monthly: Review and merge dependency updates
# Manually test before merging

# As needed: Bug fixes and features
git commit -m "fix: ..."
git push origin main
```

### Creating Releases

```bash
# Patch release (1.0.0 → 1.0.1)
npm run release:patch
git push origin main --tags

# Minor release (1.0.0 → 1.1.0)
npm run release:minor
git push origin main --tags

# Major release (1.0.0 → 2.0.0)
npm run release:major
git push origin main --tags
```

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm CLI Documentation](https://docs.npmjs.com/cli/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [npm Package Publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
