import type { FilesystemExtractHooks } from '../contexts';
import type { DirectoryExtractAPI } from '../types';

export type ExtractEntitiesFromFileSystemOptions = {
	rootDir: string;
	extractors: DirectoryExtractAPI[];
	hooks?: FilesystemExtractHooks;
	meta?: Record<string, unknown>;
};
