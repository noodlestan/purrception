import type { EntityDataBase, EntityDataBasePartial } from '@purrception/primitives';

import type { DirectoryExtractContext } from '../contexts';
import type { DirectoryExtractAPI, EntityExtractorFiles } from '../types';

import type { Options } from './types';

export function defineDirectoryExtractor<
	P extends EntityDataBasePartial,
	T extends EntityDataBase,
	F extends EntityExtractorFiles,
>(options: Options<P, F, T>): DirectoryExtractAPI {
	return {
		skipSubDirs: options.skipSubDirs ?? false,
		getProcessor: async (ctx: DirectoryExtractContext) => {
			if (!options.match || !options.resolve) {
				return undefined;
			}

			const partial = await options.match(ctx);
			if (!partial) {
				return undefined;
			}

			const files = await options.resolve(ctx, partial);
			if (!files) {
				return undefined;
			}

			return () => options.extract(ctx, partial, files);
		},
	};
}
