# Quick Start: GitHub CI/CD Setup (5 Minutes)

Fast-track guide to get CI/CD running immediately.

## 📋 What You Need

1. GitHub account and repository created
2. npm account
3. 5 minutes of time

## ⚡ Quick Steps

### 1️⃣ Generate npm Token (2 min)

```bash
# Open in browser:
# https://www.npmjs.com/settings/USERNAME/tokens

# Click: Generate New Token > Automation
# Name: GitHub Actions - mui-image-gallery-viewer
# Copy the token (appears once only!)
```

### 2️⃣ Add to GitHub Secrets (1 min)

```bash
# Go to: https://github.com/YOUR_USERNAME/mui-image-gallery-viewer

# Click: Settings > Secrets and variables > Actions
# New secret:
#   Name: NPM_TOKEN
#   Value: (paste token from step 1)
# Save
```

### 3️⃣ Enable GitHub Pages (1 min)

```bash
# In same repo > Settings > Pages
# Source: Deploy from a branch
# Branch: gh-pages
# Folder: / (root)
# Save
```

### 4️⃣ Push to GitHub (1 min)

```bash
git push origin main
# Workflows start automatically!
```

### 5️⃣ Verify (3 min wait)

```bash
# Go to: Actions tab
# Wait for workflows to complete:
# ✅ CI - Test & Lint (green checkmark)
# ✅ Build & Deploy Storybook (green checkmark)
```

## 🎯 Now You Have

- ✅ Automated testing on every push
- ✅ Storybook auto-deployed to: https://github.com/YOUR_USERNAME.github.io/mui-image-gallery-viewer/
- ✅ Ready to publish: `npm run release:patch && git push origin main --tags`

## 📞 Need Detailed Setup?

See [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md) for complete guide.

## 🚀 Next: Publish First Release

```bash
npm run release:patch
git push origin main --tags

# Check: Actions > Publish to npm workflow
# After ~5 minutes: npm registry has your package!
```

**Done!** 🎉
