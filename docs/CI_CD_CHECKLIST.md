# CI/CD Setup Checklist

Complete checklist for setting up full CI/CD for `mui-image-gallery-viewer` with GitHub Actions.

## 🔧 Prerequisites

- [ ] GitHub account
- [ ] npm account
- [ ] Repository created (ankit-shukla/mui-image-gallery-viewer)
- [ ] Local repository initialized and pushed to GitHub

## 📦 Step 1: Verify Workflow Files

Check all workflow files are in place:

```bash
cd /Users/ankit/Projects/easysocial/mui-image-gallery-viewer
ls -la .github/workflows/
```

- [ ] `.github/workflows/ci.yml` exists
- [ ] `.github/workflows/publish-npm.yml` exists
- [ ] `.github/workflows/build-storybook.yml` exists
- [ ] `.github/dependabot.yml` exists
- [ ] `.github/pull_request_template.md` exists
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` exists
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md` exists

## 🔑 Step 2: Configure GitHub Secrets

### NPM_TOKEN (Required)

- [ ] Go to https://www.npmjs.com/settings/username/tokens
- [ ] Generate new token:
  - [ ] Type: Automation
  - [ ] Name: "GitHub Actions - mui-image-gallery-viewer"
- [ ] Copy the token (only shown once)
- [ ] Go to repository: https://github.com/ankit-shukla/mui-image-gallery-viewer
- [ ] Settings > Secrets and variables > Actions
- [ ] Click "New repository secret"
- [ ] Name: `NPM_TOKEN`
- [ ] Value: Paste the token
- [ ] Click "Add secret"

**Verification**:
```bash
# No direct way to verify, but you'll see success when publishing
```

### SLACK_WEBHOOK_URL (Optional)

If you want Slack notifications on release:

- [ ] Go to Slack workspace
- [ ] Manage Apps > Incoming Webhooks
- [ ] "Add to Slack"
- [ ] Choose channel (e.g., #deployments)
- [ ] Copy webhook URL
- [ ] Go to repository Secrets
- [ ] Add new secret:
  - [ ] Name: `SLACK_WEBHOOK_URL`
  - [ ] Value: Paste webhook URL
  - [ ] Click "Add secret"

## 📄 Step 3: Configure GitHub Pages

For Storybook deployment:

- [ ] Go to Repository Settings
- [ ] Navigate to Pages (left sidebar)
- [ ] Under "Build and deployment":
  - [ ] Source: "Deploy from a branch"
  - [ ] Branch: `gh-pages`
  - [ ] Folder: `/ (root)`
- [ ] Click "Save"

**Note**: `gh-pages` branch will be created automatically by the workflow

## ✅ Step 4: Enable Branch Protection (Optional but Recommended)

To require checks before merging:

- [ ] Go to Repository Settings
- [ ] Branches (left sidebar)
- [ ] Click "Add rule" under "Branch protection rules"
- [ ] Pattern name: `main`
- [ ] Check "Require a pull request before merging"
- [ ] Check "Require status checks to pass":
  - [ ] CI - Test & Lint
  - [ ] TypeScript Type Check
- [ ] Click "Create"

## 🧪 Step 5: Test CI Workflow

### Initial Setup

- [ ] Ensure all changes are committed
- [ ] Push to GitHub: `git push origin main`

### Run Tests Locally First

```bash
# Full QA locally (before pushing)
npm run build
npm run test -- run
npm run lint
```

- [ ] All tests pass locally
- [ ] No lint errors
- [ ] Build succeeds

### Trigger CI Workflow

- [ ] Push to main: `git push origin main`
- [ ] Go to https://github.com/ankit-shukla/mui-image-gallery-viewer/actions
- [ ] Look for "CI - Test & Lint" workflow
- [ ] Wait for it to complete (~2-3 minutes)
- [ ] Check results:
  - [ ] Linting passed
  - [ ] Tests passed (Node 18.x)
  - [ ] Tests passed (Node 20.x)
  - [ ] TypeScript check passed
  - [ ] Build succeeded
  - [ ] Storybook built successfully

**If fails**:
- [ ] Click workflow to view logs
- [ ] Fix issues locally
- [ ] Push again

## 📚 Step 6: Test Storybook Deployment

### Verify Deployment

- [ ] CI workflow completed successfully
- [ ] Go to Actions > "Build & Deploy Storybook"
- [ ] Wait for it to complete (~2-3 minutes)
- [ ] Check if `gh-pages` branch was created:
  - [ ] Settings > Branches > should show `gh-pages`

### Access Storybook

- [ ] Go to: https://ankit-shukla.github.io/mui-image-gallery-viewer/
- [ ] Storybook should be live with stories
- [ ] Click through some stories
- [ ] Verify all components render correctly

**If not deployed**:
- [ ] Check workflow logs in Actions
- [ ] Verify GitHub Pages settings
- [ ] Clear browser cache
- [ ] Try manual deployment from Actions

## 🚀 Step 7: Test npm Publishing

### Prepare Release

```bash
# Ensure everything is committed
git status  # Should be clean

# Run full build locally
npm run build
npm run test -- run

# Create version bump (patch release)
npm run release:patch

# Review changes
git log -1          # Should show version update
git show CHANGELOG  # Should show new version entry
```

- [ ] Version was bumped in package.json
- [ ] CHANGELOG.md was updated
- [ ] Git tag was created

### Trigger Publishing

```bash
# Push with tags (this triggers the publish workflow)
git push origin main --tags
```

- [ ] Verify push succeeded: `git push -v`

### Monitor Publishing

- [ ] Go to https://github.com/ankit-shukla/mui-image-gallery-viewer/actions
- [ ] Look for "Publish to npm" workflow
- [ ] Wait for it to complete (~5-7 minutes)
- [ ] Check workflow passed with green checkmark

### Verify Package on npm

```bash
# Check package was published
npm view mui-image-gallery-viewer

# Or visit:
# https://www.npmjs.com/package/mui-image-gallery-viewer
```

- [ ] Package appears on npm registry
- [ ] Version matches tag (v1.0.0, etc.)
- [ ] Package is public and installable

### Verify GitHub Release

- [ ] Go to https://github.com/ankit-shukla/mui-image-gallery-viewer/releases
- [ ] New release should be created
- [ ] Release title: v1.0.0 (or your version)
- [ ] Release notes include CHANGELOG excerpt

### Verify Slack Notification (If Configured)

- [ ] Check your Slack channel for release notification
- [ ] Message should include version and links

## 📊 Step 8: Verify All Workflows

Go to **Actions** tab and check all workflows:

### Workflow List

- [ ] **CI - Test & Lint**
  - [ ] Runs on: push to main/develop, PRs to main/develop
  - [ ] Last run: successful (green checkmark)
  - [ ] Duration: ~2-3 minutes

- [ ] **Publish to npm**
  - [ ] Runs on: version tags (v*.*.*)
  - [ ] Last run: successful
  - [ ] Duration: ~5-7 minutes

- [ ] **Build & Deploy Storybook**
  - [ ] Runs on: push to main
  - [ ] Last run: successful
  - [ ] Duration: ~2-3 minutes

- [ ] **Dependabot**
  - [ ] Status: enabled
  - [ ] Check: .github/dependabot.yml exists

## 🔄 Step 9: Test Pull Request Workflow

### Create Test PR

```bash
# Create feature branch
git checkout -b test/ci-workflow

# Make a small change (e.g., update README)
echo "# Test PR" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify PR workflow"
git push origin test/ci-workflow
```

- [ ] Go to GitHub and create PR from `test/ci-workflow` to `main`
- [ ] PR should trigger CI workflow
- [ ] Check: Status checks should run automatically
- [ ] Check: Branch protection requires checks to pass

### Verify PR Checks

- [ ] PR shows status: "All checks have passed"
- [ ] "Merge pull request" button is enabled
- [ ] Merge button disabled until checks pass (if protection enabled)

### Test Merging

- [ ] Click "Merge pull request"
- [ ] Confirm merge
- [ ] Branch is merged to main

### Cleanup

- [ ] Delete test branch locally and remote: `git branch -D test/ci-workflow`

## 📋 Step 10: Documentation & Maintenance

### Update Documentation

- [ ] README.md is up to date
- [ ] CLAUDE.md documents architecture
- [ ] CONTRIBUTING.md is complete
- [ ] DEPLOYMENT.md explains workflows
- [ ] docs/GITHUB_SECRETS_SETUP.md is clear

### Configure Monitoring

- [ ] Subscribe to GitHub notifications:
  - [ ] Actions failing
  - [ ] Dependabot PRs (optional)
  - [ ] Releases

### Set Reminders

- [ ] Monthly: Review dependency updates
- [ ] Quarterly: Audit GitHub secrets and rotate tokens
- [ ] Yearly: Major dependency updates

## 🎯 Step 11: First Production Release

Only when everything is tested:

```bash
# Ensure main branch is up to date
git checkout main
git pull origin main

# Run full verification locally
npm run build      # Build passes
npm run test -- run  # Tests pass
npm run lint       # Linting passes

# Create release
npm run release:minor  # Or major/patch as appropriate

# View changes
git log -3         # Show commits
git diff HEAD~1    # Show version changes

# Push to GitHub with tags
git push origin main --tags

# Monitor Actions workflow
# Go to https://github.com/ankit-shukla/mui-image-gallery-viewer/actions

# Verify on npm and Storybook
npm view mui-image-gallery-viewer
# https://ankit-shukla.github.io/mui-image-gallery-viewer/
```

- [ ] All GitHub Actions pass
- [ ] Package published to npm
- [ ] Storybook deployed
- [ ] GitHub Release created
- [ ] Slack notification sent (optional)

## ✅ Post-Setup Verification

Run this final checklist:

- [ ] **CI passes**: `git push origin main` triggers successful CI
- [ ] **Storybook deploys**: New commit deploys to GitHub Pages
- [ ] **npm publishes**: Version tag publishes to npm registry
- [ ] **All workflows run**: Actions tab shows all workflows active
- [ ] **No workflow errors**: All green checkmarks
- [ ] **Documentation complete**: All guides readable and accurate
- [ ] **Secrets configured**: NPM_TOKEN and SLACK_WEBHOOK_URL set
- [ ] **GitHub Pages enabled**: Settings > Pages configured correctly
- [ ] **Branch protection active**: Main branch requires checks (optional)
- [ ] **Contributors can merge**: PR workflow allows merges after checks pass

## 🚨 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| npm publish fails with 401 | Verify NPM_TOKEN in secrets, regenerate if expired |
| Storybook not deploying | Check Settings > Pages, verify gh-pages branch |
| CI tests fail | Run `npm run test -- run` locally to debug |
| Workflow not triggering | Check branch name, push with correct tag format (v*.*.*) |
| GitHub Pages 404 | Clear cache, check gh-pages branch, verify settings |

## 📞 When to Call for Help

If you encounter issues:

1. **Check workflow logs**: Actions tab > click workflow > view logs
2. **Search errors**: Copy error message into GitHub/Stack Overflow
3. **Review documentation**: 
   - [GitHub Actions Docs](https://docs.github.com/en/actions)
   - [npm Docs](https://docs.npmjs.com/)
4. **Ask in repo issues**: Create issue with workflow logs

## 🎉 Success!

Once this checklist is complete, you have:

✅ Automated testing on every push  
✅ Automated Storybook deployment  
✅ Automated npm publishing  
✅ Automatic dependency updates  
✅ Branch protection with status checks  
✅ GitHub Releases auto-generated  
✅ Optional Slack notifications  

**You're ready for production!** 🚀
