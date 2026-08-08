import { type InterfaceDeclaration, PurrceptionLanguageId } from '@purrception/lang-ts';
import ts from 'typescript';

import type { ProgramFileAPI } from '../../program';

import { extractNodeGenerics } from './extractNodeGenerics';
import { extractObjectLiteralTypeNode } from './extractObjectLiteralTypeNode';
import { extractTypeExpression } from './extractTypeExpression';
import { isExportedDeclaration } from './isExportedDeclaration';

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
