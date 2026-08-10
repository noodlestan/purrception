# purrception-context-abstraction-base-context

## Scope

- `$SCOPE = purrception-lang-ts + purrception-primitives + purrception-source-fs`

## Summary

Introduce a shared `BaseContext` abstraction so context objects carry a serializable identity, an explicit parent link, and a stable hierarchy representation across package boundaries.

## User story

As a developer working with purrception contexts, I need every context creator to expose the same base identity and parent chain so loggers, warnings, and events can attach a stable serialized context trace.

## Refined

- Add a new shared `BaseContext` type with:
  - `type: string`
  - `value: string`
  - `_parent(): BaseContext | undefined`
  - `_baseContext(): BaseContext`
  - `_id(): string`
  - `_hierarchy(): string`
- Add `createBaseContext(value, parent?: BaseContext)` to encapsulate the serializable identity of a context.
- Make these context types extend `BaseContext`:
  - `ProgramFilesContext` in `cli/purrception-lang-ts-extract/src/program/types.ts`
  - `EntityExtractContext` in `libs/purrception-primitives/src/types.ts`
  - `DirectoryExtractContext` in `cli/purrception-source-fs/src/contexts/types.ts`
  - `FilesystemExtractContext` in `cli/purrception-source-fs/src/contexts/types.ts`
- Set the `type` member values to:
  - `program-files`
  - `entity-extract`
  - `directory-extract`
  - `filesystem-extract`
- Update all constructors for these contexts to call `createBaseContext(value, parent)`.
- Use the local context value as the base `value` where appropriate, such as `path`, `filename`, or similar identifiers.
- Keep constructor changes explicit so every context creation site is visible in code.

## Unrefined

- Confirm the exact package and file where `BaseContext` and `createBaseContext` should live.
- Decide whether `_hierarchy()` should include only `_id()` strings or a richer serialized shape.
- Confirm how `_baseContext()` should behave when wrappers or derived contexts are nested.
- Check whether existing call sites need migration helpers or can be updated directly.
- Verify whether any context types outside the listed scope should adopt the same base abstraction later.

## Acceptance criteria

- All four listed context types extend the shared base context contract.
- Each constructor explicitly invokes `createBaseContext(value, parent)`.
- Every context instance can return a stable `_id()` and a parent-walkable `_hierarchy()`.
- The serialized identity can be used by loggers or events without depending on object identity.
