import ts from 'typescript';

import type { ProgramFileAPI } from '../../program';

export function isExportedDeclaration(
	programFile: ProgramFileAPI,
	node:
		| ts.ArrowFunction
		| ts.FunctionExpression
		| ts.FunctionDeclaration
		| ts.TypeAliasDeclaration
		| ts.InterfaceDeclaration,
): boolean {
	if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
		return !!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
	}

	return programFile.exportsMap().has(node);
}
