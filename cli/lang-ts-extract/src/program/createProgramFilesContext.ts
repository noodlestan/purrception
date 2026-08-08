import type { ProgramFilesContext } from './types';

export function createProgramFilesContext(
	path: string,
	readFile: (filename: string) => Promise<string>,
): ProgramFilesContext {
	return {
		path,
		readFile,
	};
}
