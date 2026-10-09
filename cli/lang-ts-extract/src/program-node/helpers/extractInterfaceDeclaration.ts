import { type InterfaceDeclaration, PurrceptionLanguageId } from '@purrception/lang-ts';
import ts from 'typescript';

import type { ProgramFileAPI } from '../../program/index.js';

import { extractNodeGenerics } from './extractNodeGenerics.js';
import { extractObjectLiteralTypeNode } from './extractObjectLiteralTypeNode.js';
import { extractTypeExpression } from './extractTypeExpression.js';
import { isExportedDeclaration } from './isExportedDeclaration.js';

export function extractInterfaceDeclaration(
	programFile: ProgramFileAPI,
	name: string,
	declaration: ts.InterfaceDeclaration,
): InterfaceDeclaration {
	const generic = extractNodeGenerics(declaration);
	const object = extractObjectLiteralTypeNode(declaration);

	const extended = (declaration.heritageClauses || [])
		.flatMap(clause => clause.types)
		.map(type => extractTypeExpression(type));

	return {
		at: programFile.filepath,
		name,
		lang: PurrceptionLanguageId,
		kind: 'interface',
		private: !isExportedDeclaration(programFile, declaration),
		node: {
			generic,
			heritage: extended,
			members: object.members,
		},
	};
}
