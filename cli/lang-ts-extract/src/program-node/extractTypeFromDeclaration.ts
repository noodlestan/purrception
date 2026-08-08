import {
	PurrceptionLanguageId,
	type TypeDeclaration,
	type TypeExpressionDeclaration,
} from '@purrception/lang-ts';
import ts from 'typescript';

import { extractNodeJsDoc } from '../jsdoc';
import type { ProgramFileAPI } from '../program';

import {
	extractExportedName,
	extractInterfaceDeclaration,
	extractTypeExpression,
	isExportedDeclaration,
} from './helpers';

export function extractTypeFromDeclaration(
	programFile: ProgramFileAPI,
	declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration,
): TypeDeclaration {
	const map = programFile.exportsMap();

	const name = extractExportedName(declaration, map);
	const jsDoc = extractNodeJsDoc(declaration);
	const { description, templateTags, tags } = jsDoc;

	if (ts.isInterfaceDeclaration(declaration)) {
		return extractInterfaceDeclaration(programFile, name, declaration);
	}

	const base = extractTypeExpression(declaration);
	const node = {
		...base,
		description,
		templateTags,
		tags,
	};
	const type: TypeExpressionDeclaration = {
		at: programFile.filepath,
		name,
		lang: PurrceptionLanguageId,
		kind: 'type',
		private: !isExportedDeclaration(programFile, declaration),
		node,
	};
	return type;
}
