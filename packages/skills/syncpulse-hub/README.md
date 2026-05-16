# 🎮 SyncPulse Hub

**Centralized installation and orchestration system for all @h4shed packages**

## Features

- **Unified Installation**: Single command to install all 63 packages
- **Orchestrated Setup**: Parallel execution with dependency management
- **Pre-Deployment Validation**: Comprehensive testing before merge
- **Auto-Update Checking**: Automatic update detection in each chat session
- **Registry Management**: Centralized package registry and discovery

## Quick Start

```bash
# Orchestrated setup (entire ecosystem)
npm run setup

# Check for updates
npm run check-updates

# Build the hub
npm run build
```

## Architecture

```
SyncPulse Hub
├── PackageRegistry (63 packages)
├── OrchestrationEngine (parallel execution)
├── SetupOrchestrator (coordinated setup)
├── DeploymentValidator (pre-merge testing)
└── UpdateChecker (auto-update detection)
```

## 63-Package Ecosystem

- **31 Skills**: Design, generative art, productivity, content creation
- **28 Tools**: Development tools, testing, styling, bundling
- **3 Core**: mcp-core, mcp-cli, docs
- **1 Session**: multi-account-session-tracking

See registry for complete list.

## Integration

### In Claude Chats
Auto-checks for updates on each session:
```typescript
import { SyncPulseHub } from '@h4shed/syncpulse-hub';

// Called automatically
const hub = new SyncPulseHub('full');
await hub.checkUpdates();
```

### In CI/CD
Validates before merge:
```bash
npm run build
npm run typecheck
npm run test

# Then validate deployment
node scripts/validate-deployment.sh
```

## Documentation

### Comprehensive Guides
- **[Complete Ecosystem](../../docs/SYNCPULSE_HUB_ECOSYSTEM.md)** — Full registry, package inventory, and integration guide
- **[Architecture](../../docs/SYNCPULSE_ARCHITECTURE.md)** — System design and orchestration details
- **[Developer Guide](../../docs/SYNCPULSE_DEVELOPER_GUIDE.md)** — Development and integration instructions
- **[Integration Strategy](../../docs/architecture/SYNCPULSE_INTEGRATION_STRATEGY.md)** — Detailed integration patterns

### Setup & Configuration
- **[Setup Script](../../scripts/setup-syncpulse-hub.sh)** — Automated ecosystem setup
- **[Release Roadmap](../../docs/RELEASES.md)** — v1.2.0 - v2.0.0 release timeline

## Package Inventory

**Published (9 skills):**
- @h4shed/skill-algorithmic-art, ascii-mockup, canvas-design, frontend-design, theme-factory, mcp-builder, pre-deploy-validator, skill-creator, underworld-writer

**Ready for v1.2.0 (8 skills):**
- mermaid-terminal, ux-journeymapper, svg-generator, project-manager, project-status-tool, daily-review, multi-account-session-tracking, linkedin-master-journalist

**Planned (Wave 1-3):** ~40 skills scheduled for v1.3.0 - v2.0.0

See [SYNCPULSE_HUB_ECOSYSTEM.md](../../docs/SYNCPULSE_HUB_ECOSYSTEM.md) for complete inventory.

## License

Apache 2.0
