import type { TypeDeclaration } from '@purrception/lang-ts';

import { type ProgramFileAPI } from '../program/index.js';
import { extractTypeFromDeclaration } from '../program-node/index.js';

export function extractTypesFromProgram(program: ProgramFileAPI): TypeDeclaration[] {
	const types = program.types().map(n => extractTypeFromDeclaration(program, n));

	return types;
}
