import type { AnonymousEntityProcessor } from '@purrception/primitives';

import type { FilesystemExtractContext } from '../contexts';

import { processDirectory } from './private';

export async function processRootDir(
	ctx: FilesystemExtractContext,
): Promise<AnonymousEntityProcessor[]> {
	return processDirectory(ctx, ctx.rootDir);
}
