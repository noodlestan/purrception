import type { EntityExtractResult } from '@purrception/primitives';

import type { DirectoryExtractContext } from '../contexts';

export function splitContextsToUpdate(
	entities: EntityExtractResult[],
	changedPaths: string[],
): [paths: string[], others: EntityExtractResult[]] {
	const toProcess = new Set<string>();
	const remaining: EntityExtractResult[] = [];

	for (const result of entities) {
		const moduleContext = result.context.context as DirectoryExtractContext;
		const isAffected = changedPaths.some(p => p.startsWith(moduleContext.dirMeta.path));
		console.info(isAffected);
		if (isAffected) {
			const modulePath = moduleContext.dirMeta.path;
			toProcess.add(modulePath);
		} else {
			remaining.push(result);
		}
	}

	const paths = [...toProcess];
	const others = remaining;
	return [paths, others];
}
