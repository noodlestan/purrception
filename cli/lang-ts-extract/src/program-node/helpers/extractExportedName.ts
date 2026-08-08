import ts from 'typescript';

export function extractExportedName(
	node:
		| ts.TypeAliasDeclaration
		| ts.InterfaceDeclaration
		| ts.FunctionDeclaration
		| ts.VariableDeclaration,
	exportMap: Map<ts.Node, string>,
): string {
	const exportedName = exportMap.get(node);

	if (exportedName) {
		return exportedName;
	}

	if (!node.name || !ts.isIdentifier(node.name)) {
		throw new Error(
			`Expected identifier name, got ${node.name ? ts.SyntaxKind[node.name?.kind] : 'undefined'}.`,
		);
	}

	return node.name.text;
}
