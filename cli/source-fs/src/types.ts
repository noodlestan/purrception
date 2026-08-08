import type {
	AnonymousEntityProcessor,
	EntityDataBase,
	EntityDataBasePartial,
	EntityDecorator,
	EntityExtractResult,
} from '@purrception/primitives';

import type { DirectoryExtractContext } from './contexts';

export type EntityMetaMatcher<P extends EntityDataBasePartial> = (
	ctx: DirectoryExtractContext,
) => Promise<P | undefined>;

export type EntityExtractorFiles = Record<string, string | string[]>;

export type EntityFileResolver<P extends EntityDataBasePartial, F extends EntityExtractorFiles> = (
	ctx: DirectoryExtractContext,
	partial: P,
) => Promise<F | undefined>;

export type DirectoryExtractorOptions<
	P extends EntityDataBasePartial,
	F extends EntityExtractorFiles,
	T extends EntityDataBase = EntityDataBase,
> = {
	matcher?: EntityMetaMatcher<P>;
	resolver?: EntityFileResolver<P, F>;
	decorator?: EntityDecorator<T>;
};

export type DirectoryExtractAPI = {
	skipSubDirs: boolean;
	getProcessor: (context: DirectoryExtractContext) => Promise<AnonymousEntityProcessor | undefined>;
};

export type DirectoryExtractorFactory<
	P extends EntityDataBasePartial = EntityDataBasePartial,
	F extends EntityExtractorFiles = EntityExtractorFiles,
	T extends EntityDataBase = EntityDataBase,
> = (options?: DirectoryExtractorOptions<P, F, T>) => DirectoryExtractAPI;

export type DirectoryEntityProcessor<
	P extends EntityDataBasePartial = EntityDataBasePartial,
	F extends EntityExtractorFiles = EntityExtractorFiles,
	T extends EntityDataBase = EntityDataBase,
> = (ctx: DirectoryExtractContext, partial: P, files: F) => Promise<EntityExtractResult<T>[]>;
