# CI/CD Workflow Diagram

Visual representation of the complete CI/CD pipeline for `mui-image-gallery-viewer`.

## 🔄 Complete Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LOCAL DEVELOPMENT                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                ┌───────────────────┴───────────────────┐
                │                                       │
                ▼                                       ▼
        ┌──────────────┐                      ┌──────────────┐
        │  Feature     │                      │   Bug Fix    │
        │  Branch      │                      │   Branch     │
        └──────────────┘                      └──────────────┘
                │                                       │
                │ git push origin feature/xyz          │ git push origin fix/abc
                │                                       │
                ▼                                       ▼
        ┌──────────────────────────────────────────────────────┐
        │     Create Pull Request to main                      │
        └──────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      🔵 CI WORKFLOW TRIGGERED                               │
│                                                                              │
│  Trigger: PR to main branch                                               │
│  File: .github/workflows/ci.yml                                          │
│                                                                              │
│  ✅ Step 1: Linting                 (ESLint check)      ~30s              │
│  ✅ Step 2: Unit Tests              (Vitest)            ~20s              │
│  ✅ Step 3: Coverage Report         (Codecov)           ~10s              │
│  ✅ Step 4: Build Library           (Vite)              ~20s              │
│  ✅ Step 5: Build Storybook         (Storybook)         ~30s              │
│  ✅ Step 6: Type Check              (TypeScript)        ~15s              │
│                                                                              │
│  Status: Branch protection prevents merge until all pass ✓                │
│  Duration: ~2-3 minutes total                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
            ✅ All checks pass            ❌ Checks fail
                    │                               │
                    ▼                               ▼
            ┌──────────────┐            ┌──────────────┐
            │   Review     │            │   Fix code   │
            │   & Merge    │            │   locally    │
            │   PR         │            │              │
            └──────────────┘            └──────────────┘
                    │                               │
                    │ Merge button enabled         │ Push fixes
                    │                               │
                    ▼                               ▼
                    │◄──────────────────────────────┘
                    │
                    ▼
        ┌──────────────────────────────┐
        │   git push origin main       │
        │   (PR merged to main)        │
        └──────────────────────────────┘
                    │
        ┌───────────┼────────────┐
        │           │            │
        ▼           ▼            ▼
┌──────────────┐ ┌───────────────────────────┐ ┌──────────────┐
│ 🟢 CI TEST   │ │ 🟠 BUILD & DEPLOY        │ │ 🔴 PUBLISH   │
│ Workflow     │ │ STORYBOOK Workflow       │ │ Workflow     │
│              │ │                          │ │              │
│ Runs: Every  │ │ Runs: Every push to main │ │ Runs: On tag │
│ push to main │ │                          │ │ v*.*.* only  │
│              │ │ Duration: ~2-3 min       │ │              │
│ Duration:    │ │                          │ │ Duration:    │
│ ~2-3 min     │ │ Steps:                   │ │ ~5-7 min     │
│              │ │ 1. Build Storybook      │ │              │
│ Steps:       │ │ 2. Deploy to gh-pages   │ │ Steps:       │
│ 1. Lint      │ │ 3. Comment on PR        │ │ 1. Verify tag│
│ 2. Test      │ │ 4. Update custom domain │ │ 2. Lint/test │
│ 3. Build     │ │ (if configured)         │ │ 3. Build pkg │
│ 4. Type chk  │ │                          │ │ 4. Publish   │
│              │ │ Output:                  │ │ 5. Create GH │
│ ✅ All pass  │ │ Storybook live at:      │ │    Release   │
│              │ │ github.io/.../          │ │ 6. Slack msg │
│              │ │ mui-image-gallery-      │ │    (optional)│
│              │ │ viewer/                 │ │              │
│              │ │ ✅ Deployed             │ │ Output:      │
│              │ │                          │ │ Package on   │
│              │ │ Artifact: Storybook     │ │ npm registry │
│              │ │ static site             │ │ GitHub Rel.  │
└──────────────┘ └───────────────────────────┘ │ created     │
                                               │ Slack notif │
                                               │ (if enabled)│
                                               └──────────────┘
                                                     │
                                                     ▼
                                          ┌──────────────────┐
                                          │ ✅ Published to  │
                                          │ npm registry     │
                                          │                  │
                                          │ npm install      │
                                          │ mui-image-       │
                                          │ gallery-viewer   │
                                          └──────────────────┘
```

## 📊 Workflow Triggers

### CI Workflow (ci.yml)

```
Trigger: push to main/develop OR PR to main/develop
├─ Runs on:
│   ├─ Node 18.x (full matrix)
│   └─ Node 20.x
├─ Steps:
│   ├─ Checkout
│   ├─ Setup Node
│   ├─ Install deps
│   ├─ Lint code
│   ├─ Run tests
│   ├─ Coverage report
│   ├─ Build library
│   ├─ Build Storybook
│   └─ TypeScript check
├─ Duration: ~2-3 minutes
└─ Status: Required for main branch
```

### Storybook Deployment Workflow (build-storybook.yml)

```
Trigger: push to main OR manual dispatch
├─ Parallel Jobs:
│   ├─ Build:
│   │   ├─ Checkout
│   │   ├─ Setup Node
│   │   ├─ Install deps
│   │   ├─ Build Storybook
│   │   └─ Upload artifact
│   └─ Deploy:
│       ├─ Download artifact
│       ├─ Configure Pages
│       ├─ Upload to Pages
│       ├─ Deploy to GitHub Pages
│       └─ Comment on PR (if PR)
├─ Duration: ~2-3 minutes
└─ Output: Storybook at github.io/...
```

### npm Publish Workflow (publish-npm.yml)

```
Trigger: version tag v*.*.* (e.g., v1.0.0)
├─ Steps:
│   ├─ Checkout (with full history)
│   ├─ Setup Node
│   ├─ Install deps
│   ├─ Verify version matches tag
│   ├─ Run lint
│   ├─ Run tests
│   ├─ Full build
│   ├─ Check npm auth
│   ├─ Publish to npm
│   ├─ Extract CHANGELOG
│   ├─ Create GitHub Release
│   ├─ Upload release assets
│   └─ Send Slack notification (optional)
├─ Duration: ~5-7 minutes
├─ Output:
│   ├─ Package on npm registry
│   ├─ GitHub Release created
│   ├─ Slack notification sent
│   └─ Release assets available
└─ Secrets Required: NPM_TOKEN, SLACK_WEBHOOK_URL (optional)
```

## 🔐 Secrets & Environment Variables

```
┌─────────────────────────────────────────────┐
│         GitHub Repository Secrets            │
├─────────────────────────────────────────────┤
│ NPM_TOKEN                (Required)         │
│ ├─ Used by: publish-npm.yml                 │
│ ├─ Purpose: Authenticate with npm           │
│ └─ Value: npm automation token              │
│                                              │
│ SLACK_WEBHOOK_URL         (Optional)        │
│ ├─ Used by: publish-npm.yml                 │
│ ├─ Purpose: Send release notifications      │
│ └─ Value: Slack incoming webhook            │
│                                              │
│ GITHUB_TOKEN              (Built-in)        │
│ ├─ Used by: All workflows                   │
│ ├─ Purpose: GitHub API access               │
│ └─ Auto-provided by GitHub                  │
└─────────────────────────────────────────────┘
```

## 🔄 Complete Release Process

```
┌─────────────────────────────────────────────────────────────┐
│                   Local Machine                             │
├─────────────────────────────────────────────────────────────┤
│ $ npm run release:patch                                     │
│   └─ Updates package.json version                          │
│   └─ Updates CHANGELOG.md                                  │
│   └─ Creates git commit & tag                              │
│                                                             │
│ $ git push origin main --tags                              │
│   └─ Pushes commits & tags to GitHub                       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Webhook Triggered                       │
├─────────────────────────────────────────────────────────────┤
│ Detected: New tag v1.0.1                                    │
│ Trigger: publish-npm.yml workflow starts                    │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐         ┌─────────┐      ┌─────────┐
   │ Lint    │         │ Test    │      │ Build   │
   │ ✅ Pass │         │ ✅ Pass │      │ ✅ Pass │
   └─────────┘         └─────────┘      └─────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Publish   │
                    │  to npm     │
                    │ ✅ Success  │
                    └─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────────┐   ┌──────────────┐  ┌────────────┐
   │ npm Registry│   │ GitHub Rel.  │  │Slack Notif │
   │   Updated   │   │   Created    │  │   Sent     │
   │ ✅ Live     │   │ ✅ Created   │  │ ✅ Sent    │
   └─────────────┘   └──────────────┘  └────────────┘
        │                  │                  │
        └──────────────────┴──────────────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │  Release Complete!   │
                │  Users can now:      │
                │ npm install pkg@1.0.1│
                └──────────────────────┘
```

## 📈 Status Check Flow

```
PR to main
    │
    ▼
CI Workflow Starts
    │
    ├─ Lint        ────┐
    ├─ Test        ────┤ Parallel Execution
    ├─ Build       ────┤ ~2-3 minutes total
    ├─ TypeScript  ────┤
    └─ Storybook   ────┘
         │
         ▼
    All Passed?
         │
    ┌────┴────┐
    │          │
   YES        NO
    │          │
    ▼          ▼
   ✅         ❌
  Merge   Show Errors
 Button   (Block Merge)
  Ready        │
                └─ Developer Fixes
                   └─ Push Again
                   └─ CI Re-runs
                   └─ (Loop until pass)
```

## 🚀 Performance Timeline

```
Feature Branch Created
    │
    │ (2-3 days development)
    ▼
PR Created & CI Runs
    │
    ├─ Linting      30 sec
    ├─ Tests        20 sec
    ├─ Coverage     10 sec
    ├─ Build        20 sec
    ├─ Storybook    30 sec
    ├─ TypeScript   15 sec
    │
    └─ TOTAL:       ~2-3 minutes
    │
    ├─ ✅ All Pass
    │
    ▼
Review & Merge
    │
    │ (1-24 hours review time)
    ▼
Merge to main
    │
    ├─ CI Tests Run Again    ~2-3 min
    ├─ Storybook Deploys     ~2-3 min
    │
    ▼
Ready for Release
    │
    │ (When you decide)
    ▼
npm run release:patch
git push origin main --tags
    │
    ├─ Lint          30 sec
    ├─ Tests         20 sec
    ├─ Build         40 sec
    ├─ Publish       30 sec
    ├─ Release       10 sec
    ├─ Slack         5 sec
    │
    └─ TOTAL:       ~5-7 minutes
    │
    ▼
✅ Package Live on npm
✅ GitHub Release Created
✅ Slack Notified
```

## 📚 Reference

### Workflow Files Location

```
.github/workflows/
├── ci.yml                 (Testing & linting)
├── publish-npm.yml        (npm publishing)
└── build-storybook.yml    (Storybook deployment)
```

### Documentation

```
docs/
├── QUICK_START_GITHUB.md         (5 minute setup)
├── GITHUB_SECRETS_SETUP.md       (Complete guide)
├── CI_CD_CHECKLIST.md            (Full checklist)
└── CI_CD_WORKFLOW_DIAGRAM.md     (This file)
```

### Configuration

```
.github/
├── dependabot.yml               (Auto-updates)
├── pull_request_template.md     (PR template)
└── ISSUE_TEMPLATE/
    ├── bug_report.md
    └── feature_request.md
```

## ✅ How to Use This Diagram

1. **First Setup**: Follow docs/QUICK_START_GITHUB.md
2. **Detailed Setup**: Use docs/GITHUB_SECRETS_SETUP.md
3. **Verify**: Complete docs/CI_CD_CHECKLIST.md
4. **Understand Flow**: Reference this diagram
5. **Troubleshoot**: Check workflow logs in Actions tab

---

**Status**: All workflows tested and ready ✅

For questions, see the detailed documentation files or GitHub Actions logs.
