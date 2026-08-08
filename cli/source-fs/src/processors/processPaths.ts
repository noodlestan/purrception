import type { FilesystemExtractContext } from '../contexts';
import type { DirectoryEntityProcessor } from '../types';

import { processDirectory } from './private';

export async function processPackagePaths(
	ctx: FilesystemExtractContext,
	paths: string[],
): Promise<DirectoryEntityProcessor[]> {
	const processorGroups = await Promise.all(paths.map(dir => processDirectory(ctx, dir)));
	return processorGroups.flat();
}
