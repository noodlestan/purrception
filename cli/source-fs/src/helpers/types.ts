import type { EntityDataBase, EntityDataBasePartial } from '@purrception/primitives';

import type {
	DirectoryEntityProcessor,
	EntityExtractorFiles,
	EntityFileResolver,
	EntityMetaMatcher,
} from '../types';

export type Options<
	P extends EntityDataBasePartial,
	F extends EntityExtractorFiles,
	T extends EntityDataBase,
> = {
	match?: EntityMetaMatcher<P>;
	resolve?: EntityFileResolver<P, F>;
	extract: DirectoryEntityProcessor<P, F, T>;
	skipSubDirs?: boolean;
};
