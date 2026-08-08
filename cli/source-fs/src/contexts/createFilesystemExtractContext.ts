import type { FilesystemExtractContext, FilesystemExtractContextOptions } from './types';

export function createFilesystemExtractContext(
	options: FilesystemExtractContextOptions,
): FilesystemExtractContext {
	return {
		rootDir: options.rootDir,
		extractors: options.extractors,
		hooks: options.hooks ?? {},
		defaults: options.defaults ?? {},
		meta: options.meta || {},
		log: options.log ?? (() => {}),
	};
}
