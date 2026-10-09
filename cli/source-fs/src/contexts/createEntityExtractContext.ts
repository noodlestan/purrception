import type { EntityDataBasePartial, EntityExtractContext } from '@purrception/primitives';

import type { DirectoryExtractContext } from './types.js';

export function createEntityExtractContext(
	context: DirectoryExtractContext,
	partial: EntityDataBasePartial,
): EntityExtractContext<DirectoryExtractContext> {
	return { context, partial };
}
