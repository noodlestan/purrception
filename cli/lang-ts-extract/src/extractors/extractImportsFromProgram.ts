import type { ImportedSymbol } from '@purrception/primitives';

import { type ProgramFileAPI } from '../program/index.js';

export function extractImportsFromProgram(program: ProgramFileAPI): Map<string, ImportedSymbol> {
	const types = program.importsMap();

	return types;
}
