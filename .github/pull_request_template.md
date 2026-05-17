## 📝 Description
<!-- Provide a brief description of your changes -->

## 🎯 Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📚 Documentation update
- [ ] ♻️ Refactoring (code change that doesn't fix a bug or add a feature)
- [ ] ⚡ Performance improvement
- [ ] 🔒 Security fix

## 🔗 Related Issues
Closes #[issue-number]  
Relates to #[other-issue-number]

---

## ✅ Pre-Merge Checklist

### 📦 Dependency & Conflict Management
- [ ] `npm install --package-lock-only --ignore-scripts` runs successfully
- [ ] `package-lock.json` synchronized with `package.json`
- [ ] No workspace naming conflicts (`EDUPLICATEWORKSPACE`)
- [ ] All merge conflicts resolved
- [ ] Branch up-to-date with target branch (`main`)

### 🔍 Code Quality
- [ ] `npm run typecheck` passes (no TypeScript errors)
- [ ] `npm run lint` passes (no new warnings in changed files)
- [ ] `npm run build` succeeds (all packages build)
- [ ] `npm audit` reviewed (no critical/high vulnerabilities)

### ✅ Testing
- [ ] `npm test --workspaces --if-present` passes
- [ ] Manual feature testing completed (golden path + edge cases)
- [ ] No regressions in related features
- [ ] GitHub Actions CI/CD passes on both Node lanes (20.x, 22.x)

### 📊 Performance (if applicable)
- [ ] Benchmark baseline recorded (`npm run benchmark`)
- [ ] Performance metrics compared
- [ ] E2E metrics captured (TTI, CLS, FCP, load time)
- [ ] Results documented below

### 📝 Documentation
- [ ] `CHANGELOG.md` updated (Unreleased section)
- [ ] `README.md` updated (if applicable)
- [ ] JSDoc/TSDoc comments added for public APIs
- [ ] Release notes drafted (if release-ready)
- [ ] Version bumps justified and documented

### 👥 Review
- [ ] Code review completed (at least 1 approval)
- [ ] All review comments addressed or documented
- [ ] Architecture/security review completed (if applicable)

---

## 📊 Benchmark Results (if applicable)

| Metric | Before | After | Δ | Status |
|--------|--------|-------|---|--------|
| Build Time (ms) | - | - | - | ✓/✗ |
| Bundle Size (KB) | - | - | - | ✓/✗ |
| Runtime Speed | - | - | - | ✓/✗ |
| Memory Usage | - | - | - | ✓/✗ |
| Test Coverage | - | - | - | ✓/✗ |

**Test Environment:** Node v[X.Y.Z], [OS], [Hardware]  
**Baseline Commit:** `[SHA]`  
**Test Duration:** [X runs averaged]

---

## 🔄 Migration Guide (if breaking changes)

<!-- Provide step-by-step upgrade instructions -->

1. Step 1...
2. Step 2...
3. Rollback procedure...

---

## 🎬 Demonstration (if UI changes)

<!-- Include screenshots, GIFs, or video links demonstrating the changes -->

### Before:
[Screenshot/GIF]

### After:
[Screenshot/GIF]

---

## 📋 Additional Notes

<!-- Any additional context, decisions, or special considerations -->

---

## 🚀 Ready for Merge
- [ ] All checklist items completed
- [ ] No blockers remaining
- [ ] Ready for code review
- [ ] Ready to merge to `main`
