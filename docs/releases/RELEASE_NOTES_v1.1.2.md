# Release Notes - v1.1.2

**Release Date:** 2026-05-16  
**Status:** Stable  
**Type:** Documentation & Workflow Improvements

## Summary

Professional restructuring of documentation infrastructure with comprehensive workflow guidance for contributors and maintainers. Improved onboarding and release management procedures.

## What's Changed

### Documentation Reorganization

- **Reorganized 34 documentation files** from root into professional subdirectories
  - **Architecture** (10 files): System design, orchestration, implementation details
  - **Guides** (4 files): Setup instructions, agent handoff, troubleshooting
  - **Releases** (13 files): Release notes, publication guides, version management
  - **Analysis** (9 files): Performance reports, benchmarks, security audits
  - **Archive** (5 files): Session notes, daily reviews, historical documentation

- **Preserved 6 essential root files** for quick reference
  - README.md, CHANGELOG.md, CLAUDE.md, CONTRIBUTING.md, SECURITY.md, STATUS.md

- **Comprehensive link validation**: Fixed all relative path references to ensure zero broken links

### Contributing Guidelines Enhancement

Updated CONTRIBUTING.md with critical improvements for contributors:

- **Workspace Installation Safety**
  - Safe `npm install` pre-steps to prevent workspace metadata issues
  - Guidance on duplicate workspace name detection and resolution
  - Clear instructions on when to use `npm install --package-lock-only --ignore-scripts`

- **Accurate Version Requirements**
  - Updated Node.js minimum from 18+ to 20.x (tested on 20.x and 22.x LTS)
  - Clarified version support matrix

- **Release Automation Documentation**
  - Explained how `scripts/prepare-publish-versions.cjs` handles version bumping
  - Documented changed-package detection in CI
  - Clarified manual vs. automated version bump workflows
  - Reference to NPM_PUBLICATION_CHECKLIST.md

- **Fixed Navigation Links**
  - Corrected `docs/guides/SKILLS_GUIDE.md` → `docs/SKILLS_GUIDE.md`
  - Added cross-references to release documentation
  - Improved skill development path clarity

## Benefits

✅ **Professional Organization** — Clear categorization of 40+ documentation files  
✅ **Reduced Root Clutter** — Essential files only in root directory  
✅ **Better Navigation** — Contributors quickly find relevant documentation  
✅ **Accurate Guidance** — Workflow procedures aligned with current practices  
✅ **Zero Broken Links** — All documentation links validated  
✅ **Improved Onboarding** — Comprehensive contributing guidelines  
✅ **Release Clarity** — Clear automation and version management docs  

## Validation

- ✅ TypeScript compilation passes (Node 20.x and 22.x)
- ✅ ESLint validation passes
- ✅ All documentation links functional
- ✅ Relative paths verified for moved files
- ✅ No breaking changes to codebase or workflows

## Files Modified

- **CHANGELOG.md** — Updated Unreleased section
- **CONTRIBUTING.md** — Enhanced with workspace, automation, and workflow guidance
- **34 documentation files** — Reorganized into professional subdirectories
- **All documentation references** — Updated relative paths for new locations

## For Maintainers

This release improves the developer experience and establishes clearer processes for contributors. No changes to the core MCP system or skill packages.

**Breaking Changes:** None  
**Migrations Required:** None  
**Performance Impact:** None  

## Next Steps

Contributors should:
1. Review updated CONTRIBUTING.md for current workflow procedures
2. Refer to docs/SKILLS_GUIDE.md for skill development
3. Use docs/guides/ for setup and troubleshooting
4. Check docs/releases/NPM_PUBLICATION_CHECKLIST.md for publication procedures

Maintainers should:
1. Ensure all new PRs follow updated branch naming conventions
2. Reference new documentation locations in issue templates
3. Direct contributors to reorganized guides for common questions

---

For detailed information, see [CONTRIBUTING.md](../../CONTRIBUTING.md) and [docs/SKILLS_GUIDE.md](../SKILLS_GUIDE.md).
