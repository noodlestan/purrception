import type { EntityDataBasePartial, EntityExtractContext } from '@purrception/primitives';

import type { DirectoryExtractContext } from './types';

export function createEntityExtractContext(
	context: DirectoryExtractContext,
	partial: EntityDataBasePartial,
): EntityExtractContext<DirectoryExtractContext> {
	return { context, partial };
}
