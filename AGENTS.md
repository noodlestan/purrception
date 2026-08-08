# Agent Rules and Orientation

## Agent Boot Sequence

1. Read this file.
2. Read `package.json` to understand the project structure and available scripts.
3. Run `npm install` to install dependencies.

## Commands

- `npm run ci` — run lint, build, and test across all packages.
- `npm run lint` — lint all packages.
- `npm run build` — build all packages.
- `npm run test` — test all packages.

## Project Structure

This is an npm workspaces monorepo with packages under `libs/` and `cli/`.

- `libs/primitives/` — `@purrception/primitives` — Core types.
- `libs/lang-ts/` — `@purrception/lang-ts` — Lightweight TS AST definitions.
- `cli/source-fs/` — `@purrception/source-fs` — File-system traversal.
- `cli/lang-ts-extract/` — `@purrception/lang-ts-extract` — TS AST extractor.
