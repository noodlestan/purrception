# Source FS

The `@purrception/source-fs` package provides tools for extracting entities from file systems.

## Recommended Reading

Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources.

- `_guide.md` — this file: package overview, layout, and operating instructions.
- `README.md` — package readme.

## Package Layout

```
src/                — source code
```

## Records Management

This package does not maintain dedicated records; see the repository `_records/` for project and repository records.

## Knowledge References

This package does not maintain a dedicated architecture reference.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Verifying Step

**Instructions:**

Run from this package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
npm run test # to run all tests
npm run build # to produce a full build
```

### Operating Instructions: Verifying Completion

**Instructions:**

Run from this package directory:

```bash
npm run ci # lint, build and test
```
