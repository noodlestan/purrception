import ts from 'typescript';

export function getProgramTypes(
	sourceFile: ts.SourceFile,
): (ts.TypeAliasDeclaration | ts.InterfaceDeclaration)[] {
	const types: (ts.TypeAliasDeclaration | ts.InterfaceDeclaration)[] = [];

	const visit = (node: ts.Node) => {
		if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
			types.push(node);
		}
		ts.forEachChild(node, visit);
	};

	visit(sourceFile);

	return types;
}
