import type { FilesystemExtractContext } from '../contexts/index.js';
import type { DirectoryEntityProcessor } from '../types.js';

import { processDirectory } from './private/index.js';

export async function processPackagePaths(
	ctx: FilesystemExtractContext,
	paths: string[],
): Promise<DirectoryEntityProcessor[]> {
	const processorGroups = await Promise.all(paths.map(dir => processDirectory(ctx, dir)));
	return processorGroups.flat();
}
