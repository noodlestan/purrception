import fs from 'fs/promises';
import path from 'path';

import type { DirectoryExtractMeta } from './types';

export async function createDirectoryExtractMeta(
	dir: string,
	rootDir: string,
): Promise<DirectoryExtractMeta> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const relative = path.relative(rootDir, dir);
	const files = entries.filter(e => e.isFile()).map(e => e.name);
	const dirs = entries.filter(e => e.isDirectory()).map(e => e.name);

	return {
		path: dir,
		relative,
		files,
		dirs,
	};
}
