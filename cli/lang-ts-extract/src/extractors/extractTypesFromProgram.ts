import type { TypeDeclaration } from '@purrception/lang-ts';

import { type ProgramFileAPI } from '../program';
import { extractTypeFromDeclaration } from '../program-node';

export function extractTypesFromProgram(program: ProgramFileAPI): TypeDeclaration[] {
	const types = program.types().map(n => extractTypeFromDeclaration(program, n));

	return types;
}
