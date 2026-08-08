import type { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import type { AnonymousEntityProcessor } from '@purrception/primitives';

import {
	type FilesystemExtractContext,
	createDirectoryExtractContext,
	createDirectoryExtractMeta,
} from '../../contexts';

async function listDirEntries(dir: string): Promise<Dirent[]> {
	return await fs.readdir(dir, { withFileTypes: true });
}

export async function processDirectory(
	ctx: FilesystemExtractContext,
	dir: string,
): Promise<AnonymousEntityProcessor[]> {
	const processors: AnonymousEntityProcessor[] = [];

	const filter = ctx.hooks.directoryFilter;
	if (filter && typeof filter === 'function') {
		if (filter(dir, ctx.rootDir)) {
			return processors;
		}
	}

	const entries = await listDirEntries(dir);
	const meta = await createDirectoryExtractMeta(dir, ctx.rootDir);
	const directoryContext = createDirectoryExtractContext(ctx, meta);

	let skipSubDirs = false;

	for (const extractor of ctx.extractors) {
		const processor = await extractor.getProcessor(directoryContext);
		if (!processor) {
			continue;
		}
		skipSubDirs ||= extractor.skipSubDirs;
		processors.push(processor);
	}

	if (!skipSubDirs) {
		const subdirs = entries.filter(e => e.isDirectory()).map(e => path.join(dir, e.name));
		for (const subdir of subdirs) {
			processors.push(...(await processDirectory(ctx, subdir)));
		}
	}

	return processors;
}
