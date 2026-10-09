import type { ProgramFilesContext } from './types.js';

export function createProgramFilesContext(
	path: string,
	readFile: (filename: string) => Promise<string>,
): ProgramFilesContext {
	return {
		path,
		readFile,
	};
}
