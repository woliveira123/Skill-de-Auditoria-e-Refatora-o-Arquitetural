---
name: refactor-arch
description: Audit a backend project, report exact architectural/security findings, then refactor to MVC only after user confirmation.
---

# Refactor Architecture

Use this skill from the root of any backend project. It is technology-agnostic: identify conventions from manifests and source code instead of assuming Python, Node, Flask, or Express.

Read every file in `references/` before acting. Never print, copy, commit, or place a real secret in a report.

## Phase 1 - Analysis (read only)

1. Detect language/framework/dependencies from manifests, imports and entry points.
2. Map source files, database access, routes, domain entities and current layers.
3. Print the standard analysis summary from `references/project-analysis.md`.

## Phase 2 - Audit (read only)

1. Apply `references/anti-pattern-catalog.md`; inspect context, then record only defensible findings with exact file and line.
2. Write the report using `references/audit-report-template.md`, sorted CRITICAL through LOW.
3. State the planned MVC changes and stop. Ask exactly: `Phase 2 complete. Proceed with refactoring (Phase 3)? [y/n]`.
4. Do not modify source until the user answers yes.

## Phase 3 - Refactoring and validation

After explicit approval, follow `references/mvc-and-playbook.md`: keep public endpoint contracts, move configuration to environment-based config, isolate data access/models, route/view adapters and controllers/services, and add centralized error handling. Run the framework's boot command and exercise health plus every original endpoint. Record the commands and results. If validation fails, fix or report the failure; never claim success without evidence.
