import type { FunctionDeclaration } from '@purrception/lang-ts';

import { type ProgramFileAPI } from '../program';
import { extractFunctionFromDeclaration } from '../program-node';

/**
 * Extracts all exported function-like declarations from a source file.
 *
 * Supported declarations:
 *
 * - function foo() {}
 * - const foo = () => {}
 * - const foo = function () {}
 * - export aliases resolved through the program export map
 *
 * Returned declarations are normalized into {@link FunctionDeclaration}
 * instances and may contain either a synthesized {@link FunctionTypeNode}
 * or an explicit type expression extracted from a variable declaration.
 */
export function extractFunctionsFromProgram(program: ProgramFileAPI): FunctionDeclaration[] {
	const maybeFunctions = program
		.functions()
		.map(declaration => extractFunctionFromDeclaration(program, declaration));

	return maybeFunctions.filter((x): x is FunctionDeclaration => x !== undefined);
}
