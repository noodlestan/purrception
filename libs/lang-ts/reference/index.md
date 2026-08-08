# `@purrception/primitives`

Defines shared, minimal types for extractors.

## Models

No logic or assumptions — purely structural.

- `EntityDataBase` – base entity shape (`type`, `name`, extensible)
- `EntityExtractContext<T>` – context wrapper
- `EntityExtractResult<T>` – output of a processor

# `@purrception/source-fs`

Filesystem-driven discovery and orchestration.

Knows how to walk the filesystem — not what to extract.

## Contracts

- `DirectoryExtractorFactory<T>`
- `DirectoryEntityProcessor<T>`
- `EntityExtractorFiles`
- `EntityMetaMatcher<P extends EntityDataBase>`
- `EntityFileResolver<F extends EntityExtractorFiles, P extends EntityDataBase>`
- `EntityExtractorOptions<P extends EntityDataBase, F extends EntityExtractorFiles>`

## Implements

- `createDirectoryExtractContext`
- `extractEntitiesFromFileSystem`
- Root traversal (`processPaths`, `processRootDir`)
- FS watchers (`createDebouncedWatcher`, `splitContextsToUpdate`, etc.)
