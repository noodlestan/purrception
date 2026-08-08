import ts from 'typescript';

export function getExportMap(
	sourceFile: ts.SourceFile,
	checker: ts.TypeChecker,
): Map<ts.Node, string> {
	const map = new Map<ts.Node, string>();

	const sourceSymbol = checker.getSymbolAtLocation(sourceFile);
	if (!sourceSymbol) {
		return map;
	}

	const exports = checker.getExportsOfModule(sourceSymbol);
	for (const exp of exports) {
		const name = exp.getName();

		// Resolve aliases: export { bar } might point to foo
		const symbol = exp.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exp) : exp;

		for (const decl of symbol.getDeclarations() ?? []) {
			if (ts.isFunctionDeclaration(decl)) {
				map.set(decl, name);
				continue;
			}
			if (
				ts.isVariableDeclaration(decl) &&
				decl.initializer &&
				(ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))
			) {
				map.set(decl.initializer, name);
				continue;
			}
		}
	}

	return map;
}
