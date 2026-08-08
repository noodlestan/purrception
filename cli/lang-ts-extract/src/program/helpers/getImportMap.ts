import path from 'path';

import type { ImportedSymbol } from '@purrception/primitives';
import ts from 'typescript';

export function getImportMap(at: string, sourceFile: ts.SourceFile): Map<string, ImportedSymbol> {
	const map = new Map<string, ImportedSymbol>();

	for (const stmt of sourceFile.statements) {
		if (!ts.isImportDeclaration(stmt)) {
			continue;
		}

		const rawSource = ts.isStringLiteral(stmt.moduleSpecifier) ? stmt.moduleSpecifier.text : '';

		const from = rawSource.startsWith('.') ? './' + path.join(at, '../' + rawSource) : rawSource;

		const bindings = stmt.importClause?.namedBindings;

		if (!bindings || !ts.isNamedImports(bindings)) {
			continue;
		}

		for (const element of bindings.elements) {
			const name = element.propertyName?.text ?? element.name.text;
			const alias = element.name.text;

			map.set(alias, {
				at,
				name,
				alias,
				from,
			});
		}
	}

	return map;
}
