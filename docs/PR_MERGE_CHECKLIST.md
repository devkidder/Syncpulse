# PR Merge Checklist Template

**Repository:** Fused-Gaming-Skill-MCP  
**Date:** `[YYYY-MM-DD]`  
**PR:** `#[number]` | **Branch:** `[branch-name]`

---

## 📋 Pre-Merge Validation Phase

### Dependency Management
- [ ] Run `npm install --package-lock-only --ignore-scripts`
- [ ] Verify `package-lock.json` synchronized with `package.json`
- [ ] Check for workspace naming conflicts (`npm ERR! EDUPLICATEWORKSPACE`)
- [ ] Confirm no missing type definitions (`@types/*` packages)
- [ ] Run `npm ci` successfully in clean environment

### Conflict Resolution
- [ ] Fetch latest from target branch (`git fetch origin main`)
- [ ] Rebase or merge target branch into feature branch
- [ ] Resolve all merge conflicts (code, lock file, metadata)
- [ ] Verify no accidental overwrites in conflict resolution
- [ ] Test build after conflict resolution

### Code Quality Gates
- [ ] **TypeScript Compilation:** `npm run typecheck` passes
  - [ ] No TS2307 (missing module) errors
  - [ ] No TS2688 (ambient type) errors
  - [ ] No TS1005 (syntax) errors
- [ ] **Linting:** `npm run lint` passes
  - [ ] No new warnings in changed files
  - [ ] Pre-existing warnings documented (if applicable)
- [ ] **Build:** `npm run build` completes successfully
  - [ ] No bundle size regressions
  - [ ] All workspace packages build without errors
- [ ] **Security:** `npm audit` reviewed
  - [ ] No critical/high vulnerabilities introduced
  - [ ] Acceptable vulnerabilities documented

---

## 🧪 Testing & Validation Phase

### Automated Test Execution
- [ ] **Unit/Integration Tests:** `npm test --workspaces --if-present`
  - [ ] All test suites pass
  - [ ] Code coverage meets project threshold (if applicable)
  - [ ] No flaky test failures
- [ ] **GitHub Actions CI/CD:**
  - [ ] Test matrix (Node 20.x, 22.x) passes on both lanes
  - [ ] CodeQL Advanced scan completes without errors
  - [ ] Deployment preview (if applicable) builds successfully

### Performance Benchmarking
- [ ] **Benchmark Suite:** `npm run benchmark` (if applicable)
  - [ ] Record baseline metrics before changes
  - [ ] Measure performance after changes
  - [ ] Identify regressions (if any)
  - [ ] Document benchmark results with data:
    ```
    Metric              Before    After     Δ       Status
    ─────────────────────────────────────────────────────
    Build Time (ms)     [X]       [Y]       [±Z%]   ✓/✗
    Bundle Size (KB)    [X]       [Y]       [±Z%]   ✓/✗
    Runtime Speed       [X]       [Y]       [±Z%]   ✓/✗
    Memory Usage        [X]       [Y]       [±Z%]   ✓/✗
    ```

### Manual Testing & E2E Validation
- [ ] **Feature Validation:**
  - [ ] Test golden path (happy path)
  - [ ] Test edge cases and error states
  - [ ] Verify no regressions in related features
- [ ] **Browser/Platform Testing** (if UI changes):
  - [ ] Chrome/Chromium latest
  - [ ] Firefox latest
  - [ ] Safari (if applicable)
  - [ ] Mobile responsive view
- [ ] **E2E Metrics Captured:**
  - [ ] Page load time
  - [ ] Time to interactive (TTI)
  - [ ] Cumulative Layout Shift (CLS)
  - [ ] First Contentful Paint (FCP)
  - [ ] User interaction latency
- [ ] **Environment Testing:**
  - [ ] Development environment
  - [ ] Staging environment (if applicable)
  - [ ] Production preview deployment

---

## 📝 Documentation & Release Preparation Phase

### Documentation Updates
- [ ] **CHANGELOG.md** updated (Unreleased section)
  - [ ] Feature additions documented
  - [ ] Bug fixes documented
  - [ ] Breaking changes highlighted
  - [ ] Migration guides (if needed)
- [ ] **README.md** updated (if applicable)
  - [ ] New features documented
  - [ ] API changes reflected
  - [ ] Examples/usage updated
- [ ] **Code Documentation**
  - [ ] JSDoc/TSDoc comments added for public APIs
  - [ ] Complex logic has explanatory comments
  - [ ] Component prop documentation complete
- [ ] **Migration Guides** (if breaking changes)
  - [ ] Step-by-step upgrade instructions
  - [ ] Deprecation warnings documented
  - [ ] Rollback procedures documented

### Version Metadata Updates
- [ ] **VERSION.json** aligned with changes
  - [ ] Major/minor/patch version bumped (if needed)
  - [ ] Build number incremented
  - [ ] Release date set
- [ ] **package.json** version synchronized
- [ ] **Workspace package versions** updated (if applicable)
- [ ] **Version bump rationale** documented in PR description

### Release Notes Preparation
- [ ] **Release notes drafted** with sections:
  ```
  ## v[X.Y.Z] Release Notes
  
  ### New Features
  - [Feature description with context]
  
  ### Bug Fixes
  - [Bug description and fix details]
  
  ### Performance Improvements
  - Benchmark: [metric] improved by [X%]
  - Benchmark: [metric] improved by [X%]
  
  ### Breaking Changes
  - [Breaking change with migration path]
  
  ### Dependencies
  - Updated: [package] to v[X.Y.Z]
  
  ### Contributors
  - @[github-handle]
  ```
- [ ] **Benchmark results embedded** in release notes
- [ ] **Migration path documented** (if breaking)

---

## 👥 Review & Approval Phase

### Peer Review
- [ ] **Code Review Completed**
  - [ ] At least 1 approved review (project minimum)
  - [ ] All requested changes addressed
  - [ ] Review comments resolved or documented
- [ ] **Review Comments Status:**
  - [ ] ✅ All "request changes" comments resolved
  - [ ] ✅ All "comment" feedback addressed or noted
  - [ ] ✅ Reviewer re-approval obtained (if changes made)
- [ ] **CI/CD Sign-Off**
  - [ ] All required status checks passing
  - [ ] No skipped/ignored checks
  - [ ] Deployment preview validated

### Architecture & Security Review (if applicable)
- [ ] **Architecture Review** (for structural changes)
  - [ ] Design patterns aligned with project standards
  - [ ] No anti-patterns introduced
  - [ ] Scalability considerations addressed
- [ ] **Security Review** (for sensitive code)
  - [ ] No hardcoded secrets/credentials
  - [ ] Input validation implemented
  - [ ] OWASP top 10 threats mitigated
  - [ ] Dependency vulnerabilities assessed

---

## 🚀 Merge Execution Phase

### Pre-Merge Final Checks
- [ ] **Branch Status Verified:**
  - [ ] No uncommitted changes
  - [ ] Latest commit signed (if required)
  - [ ] Branch up-to-date with target branch
- [ ] **Merge Strategy Confirmed:**
  - [ ] Merge commit / Squash / Rebase chosen
  - [ ] Rationale for strategy documented
- [ ] **Last-Minute Validation:**
  - [ ] `npm run build` passes one final time
  - [ ] CI/CD checks still passing
  - [ ] No new commits since last check

### Merge Execution
- [ ] Merge initiated via GitHub UI (preferred) or CLI
- [ ] Merge commit message follows conventional format:
  ```
  feat: Brief description of feature
  
  Longer explanation of changes, reasoning, and impact.
  
  Fixes #[issue-number]
  Closes #[pr-number]
  ```
- [ ] Confirm merge completed successfully
- [ ] Verify merged commit visible in target branch history
- [ ] Delete feature branch (if cleanup enabled)

### Post-Merge Verification
- [ ] **Target Branch Status:**
  - [ ] CI/CD passes on merged commit
  - [ ] No new errors introduced
  - [ ] Performance metrics stable
- [ ] **Release Preparation** (if release-ready):
  - [ ] Tag created (`git tag v[X.Y.Z]`)
  - [ ] Release notes published
  - [ ] Notification sent (if applicable)
  - [ ] NPM publish workflow triggered (if applicable)

---

## 📊 Checklist Summary

**Total Items:** [AUTO-COUNT]  
**Completed:** [ ] / [ ]  
**Status:** 🟢 Ready / 🟡 In Progress / 🔴 Blocked

**Blockers (if any):**
- [ ] None
- [ ] [Blocker description]

**Notes & Additional Context:**
```
[Space for additional notes, decision rationale, or special considerations]
```

---

## Sign-Off

**PR Author:** @[github-handle]  
**Reviewed By:** @[github-handle]  
**Merged By:** @[github-handle]  
**Merge Date/Time:** YYYY-MM-DD HH:MM UTC  

**Approval:** ✅ All checklist items addressed and verified
