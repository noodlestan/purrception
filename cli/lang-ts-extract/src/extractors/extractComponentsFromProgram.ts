import { type ComponentDeclaration, type FunctionDeclaration } from '@purrception/lang-ts';

import { type ProgramFileAPI } from '../program/index.js';
import { extractFunctionFromDeclaration } from '../program-node/index.js';

import { extractComponentFromFunctionDeclaration } from './private/index.js';

export function extractComponentsFromProgram(program: ProgramFileAPI): ComponentDeclaration[] {
	const funcsDeclarations = program.functions();

	const maybeComponents = funcsDeclarations
		.map(node => extractFunctionFromDeclaration(program, node))
		.filter((x): x is FunctionDeclaration => x !== undefined)
		.map(declaration => extractComponentFromFunctionDeclaration(declaration));

	return maybeComponents.filter((x): x is ComponentDeclaration => x !== undefined);
}
