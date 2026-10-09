import type { AnonymousEntityProcessor } from '@purrception/primitives';

import type { FilesystemExtractContext } from '../contexts/index.js';

import { processDirectory } from './private/index.js';

export async function processRootDir(
	ctx: FilesystemExtractContext,
): Promise<AnonymousEntityProcessor[]> {
	return processDirectory(ctx, ctx.rootDir);
}
