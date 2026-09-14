# GitHub Secrets & CI/CD Setup Guide

Complete step-by-step guide to configure GitHub Actions workflows with all required secrets for npm publishing and Storybook deployment.

## 📋 Overview

This package uses GitHub Actions for:
- ✅ CI/CD testing and linting (`ci.yml`)
- ✅ npm package publishing (`publish-npm.yml`)
- ✅ Storybook deployment to GitHub Pages (`build-storybook.yml`)
- ✅ Automatic dependency updates (`dependabot.yml`)

## 🔑 Required Secrets

| Secret Name | Purpose | Where to Get | Required |
|------------|---------|-------------|----------|
| `NPM_TOKEN` | Publish packages to npm registry | npm.com | ✅ Yes |
| `SLACK_WEBHOOK_URL` | Send notifications to Slack (optional) | Slack workspace | ❌ No |

## Step 1: Create npm Token

### 1.1 Go to npm Settings

1. Log in to [npm.com](https://www.npmjs.com)
2. Click your profile avatar (top right)
3. Select **Access Tokens**

### 1.2 Generate New Token

1. Click **Generate New Token**
2. Choose token type: **Automation** (recommended for CI/CD)
3. Give it a descriptive name:
   ```
   GitHub Actions - mui-image-gallery-viewer
   ```
4. Click **Generate token**
5. **Copy the token immediately** (you won't be able to see it again)

### 1.3 Token Permissions

Make sure the token has these scopes:
- `automation` (recommended - full access)
- Or manually select: `publish:npm`, `read:user`, `read:org`

## Step 2: Add NPM_TOKEN to GitHub

### 2.1 Open Repository Settings

1. Go to GitHub: https://github.com/ankit-shukla/mui-image-gallery-viewer
2. Click **Settings** (top navigation)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions**

### 2.2 Create New Secret

1. Click **New repository secret**
2. **Name**: `NPM_TOKEN`
3. **Value**: Paste the token from Step 1.3
4. Click **Add secret**

**✅ Done!** The token is now encrypted and stored.

## Step 3: Optional - Add Slack Webhook (For Notifications)

### 3.1 Create Slack Webhook

If you want publish notifications on Slack:

1. Go to your Slack workspace
2. Open **Slack App Directory**
3. Search for **Incoming Webhooks**
4. Click **Add to Slack**
5. Choose channel (e.g., `#deployments`)
6. Click **Add Incoming Webhooks Integration**
7. Copy the **Webhook URL**

### 3.2 Add to GitHub Secrets

1. Go to GitHub **Settings > Secrets and variables > Actions**
2. Click **New repository secret**
3. **Name**: `SLACK_WEBHOOK_URL`
4. **Value**: Paste the webhook URL from Step 3.1
5. Click **Add secret**

**Note**: This is optional. The workflow will skip this step if the secret isn't configured.

## Step 4: Configure GitHub Pages

### 4.1 Enable GitHub Pages

1. Go to **Settings > Pages**
2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: Select `gh-pages`
   - **Folder**: `/ (root)`
3. Click **Save**

The `build-storybook.yml` workflow will automatically create and update the `gh-pages` branch.

## Step 5: Verify Workflows

### 5.1 Check Workflow Files

Verify all workflow files are present:

```bash
ls -la .github/workflows/
```

Should show:
- ✅ `ci.yml` - Testing & linting
- ✅ `publish-npm.yml` - npm publishing
- ✅ `build-storybook.yml` - Storybook deployment
- ✅ `dependabot.yml` - Dependency updates

### 5.2 Enable Workflows

Go to **Actions** tab in GitHub:
1. All workflows should be listed
2. They should be enabled by default
3. Click on each to verify no errors

## Step 6: Test the Setup

### 6.1 Test CI Workflow

Push a test commit to trigger CI:

```bash
git add .
git commit -m "test: verify CI setup"
git push origin main
```

**Expected**:
- Go to **Actions** tab
- See `CI - Test & Lint` workflow running
- Should pass linting, tests, and build
- Takes ~2 minutes

### 6.2 Test Storybook Deployment

Storybook deploys on every push to main:

**Expected**:
- See `Build & Deploy Storybook` workflow
- Check `gh-pages` branch is created (Settings > Branches)
- Storybook available at: `https://ankit-shukla.github.io/mui-image-gallery-viewer/`

### 6.3 Test npm Publishing

Create a test version tag:

```bash
# Create test release
npm run release:patch
git push origin main --tags
```

**Expected**:
- See `Publish to npm` workflow triggered
- Package appears on npm after ~3 minutes
- Check: https://www.npmjs.com/package/mui-image-gallery-viewer

## 📊 Workflow Details

### CI Workflow (`ci.yml`)

**Triggers**: Push to main/develop or PR to main/develop

**Actions**:
1. Checkout code
2. Setup Node.js (18.x, 20.x)
3. Install dependencies
4. Run linting
5. Run tests
6. Upload coverage (Codecov)
7. Build library
8. Build Storybook
9. TypeScript type check

**Duration**: ~2-3 minutes
**Cost**: ~1 minute of free GitHub Actions per run

### Publish Workflow (`publish-npm.yml`)

**Triggers**: Push version tag (v1.0.0, v1.0.1, etc.)

**Actions**:
1. Checkout code
2. Setup Node.js
3. Verify version matches tag
4. Run linting
5. Run tests
6. Full build
7. Publish to npm
8. Create GitHub Release
9. Send Slack notification (optional)

**Duration**: ~5-7 minutes
**Cost**: ~3-4 minutes of free GitHub Actions per release

### Storybook Workflow (`build-storybook.yml`)

**Triggers**: Push to main or manual dispatch

**Actions**:
1. Build Storybook static site
2. Upload artifact
3. Deploy to GitHub Pages
4. Comment on PR (if applicable)

**Duration**: ~2-3 minutes
**Cost**: ~1-2 minutes of free GitHub Actions per deployment

## 🔄 Release Workflow

### Complete Release Process

```bash
# 1. Ensure you're on main with latest code
git checkout main
git pull origin main

# 2. Run full build locally to verify everything works
npm run build
npm run test -- run

# 3. Create version bump and update CHANGELOG
npm run release:patch
# or
npm run release:minor    # for new features
npm run release:major    # for breaking changes

# 4. Review changes
git log -1          # Check commit
git diff HEAD~1     # Check CHANGELOG and version

# 5. Push with tags (this triggers npm publishing workflow)
git push origin main --tags

# 6. Monitor GitHub Actions
# Go to https://github.com/ankit-shukla/mui-image-gallery-viewer/actions

# 7. Verify
# - npm publish workflow completes successfully
# - Package appears on npm registry
# - GitHub Release is created
# - Storybook updates (automatically deployed on step 5)
```

## 📝 Available Secrets Reference

### NPM_TOKEN

**What it is**: npm authentication token

**Where to find it**:
1. https://www.npmjs.com/settings/username/tokens
2. Click **Generate New Token**
3. Type: Automation (recommended)

**Format**: Starts with `npm_` or `npmu_`

**Security**:
- ✅ Encrypted in GitHub
- ✅ Only accessible to workflows
- ✅ Never shown after saving
- ✅ Can be revoked anytime

**Rotate regularly** (recommended every 6-12 months):
1. Generate new token on npm
2. Update `NPM_TOKEN` in GitHub Secrets
3. Revoke old token on npm

### SLACK_WEBHOOK_URL

**What it is**: Slack incoming webhook for notifications

**Where to find it**:
1. Slack workspace > Manage Apps
2. Search: Incoming Webhooks
3. Click Add to Slack
4. Choose channel
5. Copy webhook URL

**Format**: Starts with `https://hooks.slack.com/services/`

**Security**:
- ✅ Encrypted in GitHub
- ✅ Only send to configured Slack channel
- ✅ Can be revoked by deleting app in Slack

**Optional**: Can be added/removed anytime without affecting workflows

## 🚨 Troubleshooting

### "npm ERR! 401 Unauthorized"

**Problem**: npm publishing failed due to authentication

**Solutions**:
1. Verify `NPM_TOKEN` is set in GitHub Secrets
2. Check token is still valid (not expired/revoked)
3. Regenerate new token and update GitHub Secret
4. Verify package name doesn't already exist with different owner

### "You do not have permission to publish"

**Problem**: Token doesn't have publish permissions

**Solution**:
1. Go to npm > Access Tokens
2. Regenerate token with `automation` type (full permissions)
3. Update GitHub Secret

### Storybook not deploying

**Problem**: GitHub Pages not updating

**Solutions**:
1. Check `build-storybook.yml` workflow passed
2. Verify `gh-pages` branch exists (Settings > Branches)
3. Check GitHub Pages source: Settings > Pages > Branch = `gh-pages`
4. Clear browser cache and reload

### Workflow stuck or not running

**Problem**: Workflow doesn't trigger or stuck in "Queued"

**Solutions**:
1. Check workflow file syntax (YAML)
2. Verify branch exists and is correct
3. Check free GitHub Actions minutes quota
4. Manually trigger workflow (Actions tab > Run workflow)

### CI tests failing

**Problem**: Tests fail in CI but pass locally

**Common causes**:
- Different Node.js versions (test with matrix: 18.x, 20.x)
- Missing dependencies (try `npm ci`)
- Flaky tests (add retries)
- Environment variables not set

**Solution**:
```bash
# Debug locally with exact CI setup
npm ci                    # Clean install
npm run test -- run      # Single run
npm run lint             # Check linting
npm run build            # Full build
```

## 📞 Support

### GitHub Actions Documentation

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### npm Documentation

- [npm tokens](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow)
- [Publishing packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

### Slack Webhooks

- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

## ✅ Checklist

Before your first release, ensure:

- [ ] Repository created on GitHub
- [ ] Remote added: `git remote add origin https://...`
- [ ] Main branch pushed: `git push -u origin main`
- [ ] NPM_TOKEN added to GitHub Secrets
- [ ] GitHub Pages enabled (Settings > Pages)
- [ ] CI workflow passes (Actions tab)
- [ ] Storybook deployment works
- [ ] Package.json name is unique on npm
- [ ] CHANGELOG.md is up to date
- [ ] Documentation is complete
- [ ] Version bumped via `npm run release:patch`
- [ ] Changes pushed with tags: `git push origin main --tags`

## 🎉 After Setup

Once everything is configured:

1. **Every push to main** triggers:
   - CI tests and linting
   - Storybook deployment

2. **Every version tag** (v1.0.0) triggers:
   - Full npm publishing workflow
   - GitHub Release creation
   - Slack notification (optional)

3. **Weekly** (Dependabot):
   - Dependency update PRs
   - Automatic testing

You now have full CI/CD! 🚀
