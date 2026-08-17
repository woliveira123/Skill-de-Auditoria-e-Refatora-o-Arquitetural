---
name: refactor-arch
description: Technology-agnostic three-phase MVC architecture audit and safe refactoring.
---

# Refactor Architecture

Read `references/knowledge-base.md`. Phase 1 is read-only stack/architecture analysis. Phase 2 is read-only auditing: produce exact-line findings ordered CRITICAL to LOW and ask `Phase 2 complete. Proceed with refactoring (Phase 3)? [y/n]`; do not edit before yes. In Phase 3, apply MVC separation, environment configuration and centralized errors, preserve public endpoints, then boot and exercise all original endpoints. Never expose or commit secrets.
