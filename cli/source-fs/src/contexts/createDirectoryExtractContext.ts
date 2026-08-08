import fs from 'fs/promises';
import path from 'path';

import { createDirectoryExtractMeta } from './createDirectoryExtractMeta';
import type {
	DirectoryExtractContext,
	DirectoryExtractMeta,
	FilesystemExtractContext,
} from './types';

export function createDirectoryExtractContext(
	ctx: FilesystemExtractContext,
	dirMeta: DirectoryExtractMeta,
): DirectoryExtractContext {
	const fileCache = new Map<string, string>();
	// const watched = new Set<[string, boolean]>();

	const hasFile = (filename: string) => {
		const exists = dirMeta.files.includes(filename);
		// watched.add([filename, exists]);
		return exists;
	};

	const readFile = async (filename: string) => {
		if (!fileCache.has(filename)) {
			const fullPath = path.join(dirMeta.path, filename);
			try {
				const contents = await fs.readFile(fullPath, 'utf8');
				fileCache.set(filename, contents);
			} catch (error) {
				throw new Error(`Failed to read file '${fullPath}': ${(error as Error).message}`);
			}
		}

		return fileCache.get(filename) as string;
	};

	const hasDir = (dirname: string) => {
		const exists = dirMeta.dirs.includes(dirname);
		// watched.add([dirname, exists]);
		return exists;
	};

	const readDir = async (dirname: string) => {
		const fullPath = path.join(dirMeta.path, dirname);
		try {
			const childMeta = await createDirectoryExtractMeta(fullPath, ctx.rootDir);
			childMeta.relative = path.join(dirMeta.relative, dirname);
			return childMeta;
		} catch (error) {
			throw new Error(`Failed to read dir '${fullPath}': ${(error as Error).message}`);
		}
	};

	return {
		fsContext: ctx,
		dirMeta,
		hasFile,
		readFile,
		hasDir,
		readDir,
	};
}
