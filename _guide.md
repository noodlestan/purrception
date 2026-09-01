# Purrception

Layered code rendering system for codebase data extracted with Purrception.

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — this file: system overview, layout, setup, verification.
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

Projects in this repository use the following workflows:

| Workflow / Path                                                        | Purpose                                                                                           |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Planning Work** `$DOMAINS/work/workflows/planning-work/workflow.art` | Create and manage work item lifecycles, collecting operational instructions according to context. |

### Planning Work

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

Runs automatically on pre-commit hook (from the repository root):

```bash
npm run ci # lint, test and build
```
