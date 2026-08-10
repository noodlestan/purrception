# purrception-add-extract-context-warning-collection

## Scope

- `$SCOPE = purrception-primitives + purrception-lang-ts-extract`

## Summary

Add an extraction context that accumulates warnings instead of relying on ad hoc `console.warn`, `console.error`, or throw paths where the pipeline can continue.

## User story

As a maintainer of the meta-extract pipeline, I need warning collection to live on the extraction context so extraction can report recoverable issues without forcing every caller to intercept console output.

## Refined

- Add a new `ExtractContext` type in `lib/purrception-primitives/src/context/types`.
- `ExtractContext` should expose:
  - `getWarnings(): ExtractWarning[]`
  - `addWarning(warning: ExtractWarning): void`
- Add a `createExtractContext()` factory.
- Make `ExtractContext` extend the contract defined by `purrception-context-abstraction-base-context.md`.
- Replace recoverable `console.error`, `console.warn`, and `throw new Error` cases in the extraction pipeline with `context.addWarning()` when the code can still return a valid result without a larger refactor.

## Unrefined

- Identify the exact extraction pipeline entry points that need context injection before changing APIs.
- Map the pipeline methods under:
  - `cli/purrception-lang-ts-extract/src/extract`
  - `cli/purrception-lang-ts-extract/src/jsdoc`
  - `cli/purrception-lang-ts-extract/src/program-node`
- Determine the abstract primitives each method currently depends on, if any.
- Propose the minimum API change needed to thread `ExtractContext` through the pipeline.
- Decide which thrown errors are truly recoverable versus structural failures that should remain throws.
- Confirm the shape and location of `ExtractWarning`.

## Acceptance criteria

- `ExtractContext` exists and stores warnings.
- `createExtractContext()` returns a usable extract context instance.
- The new context follows the shared base context contract.
- Recoverable warnings in the extraction pipeline are routed through `context.addWarning()`.
