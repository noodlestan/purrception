import type { FilesystemExtractHooks } from '../contexts/index.js';
import type { DirectoryExtractAPI } from '../types.js';

export type ExtractEntitiesFromFileSystemOptions = {
	rootDir: string;
	extractors: DirectoryExtractAPI[];
	hooks?: FilesystemExtractHooks;
	meta?: Record<string, unknown>;
};
