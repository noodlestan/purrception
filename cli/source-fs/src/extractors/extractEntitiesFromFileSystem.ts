import type { EntityExtractResult } from '@purrception/primitives';

import { createFilesystemExtractContext } from '../contexts/index.js';
import { processRootDir } from '../processors/index.js';

import type { ExtractEntitiesFromFileSystemOptions } from './types.js';

export async function extractEntitiesFromFileSystem(
	opts: ExtractEntitiesFromFileSystemOptions,
): Promise<EntityExtractResult[]> {
	const { rootDir, extractors, hooks } = opts;

	const ctx = createFilesystemExtractContext({
		rootDir,
		extractors,
		hooks,
		log: msg => console.info(msg),
		meta: opts.meta,
	});

	const processors = await processRootDir(ctx);
	const results = await Promise.all(processors.flatMap(fn => fn()));
	const entities = results.flat().map(entity => ({ ...entity, ...opts.meta }));

	return entities;
}
