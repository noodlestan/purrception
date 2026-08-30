# Purrception

Layered entity extraction system for codebase introspection. A standalone npm workspaces monorepo providing core types, lightweight TypeScript AST definitions, file-system traversal, and a TypeScript AST extractor.

## Recommended Reading

Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources.

- `_guide.md` — this file: system overview, layout, records, workflows, and operating instructions.
- `_records/project.art` — the project record.
- `_records/repository.art` — the repository record.

## Repository Layout

```
_guide.md           — this file
_backlog/           — plans, instructions, reports
_records/           — project, repository, namespace, and license records
cli/                — CLI packages
libs/               — library packages
```

## Projects

| Project            | Guide                           | Backlog     |
| ------------------ | ------------------------------- | ----------- |
| Purrception (root) | `_guide.md`                     | `_backlog/` |
| Primitives         | `libs/primitives/_guide.md`     | `NONE`      |
| Lang TS            | `libs/lang-ts/_guide.md`        | `NONE`      |
| Source FS          | `cli/source-fs/_guide.md`       | `NONE`      |
| Lang TS Extract    | `cli/lang-ts-extract/_guide.md` | `NONE`      |

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Project:** `_records/project.art`
- **Repository:** `_records/repository.art`
- **Namespace:** `_records/namespace.art`
- **License:** `_records/license.art`

## Knowledge References

This repository maintains reference material at `libs/primitives/reference/` and `libs/lang-ts/reference/`.

## Workflows

### Planning Work

This project plans its work with the workflow defined in `$DOMAINS/work/workflows/planning-work/workflow.art`.

- The backlog lives at `_backlog/` with subdirectories such as `/1-done`, `/4-next`, and `/7-backlog`.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Verifying Completion

**Instructions:**

Run from the repository root (monorepo):

```bash
npm run ci # lint, build and test
```
