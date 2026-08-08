import ts from 'typescript';

export function throwUnsupportedNodeError(node: ts.Node, reason: string): never {
	const sourceFile = node.getSourceFile();
	const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
	const kind = ts.SyntaxKind[node.kind];
	const snippet = node.getText().slice(0, 100).replace(/\s+/g, ' ');

	throw new Error(
		`Unsupported node: ${reason}
- kind: ${kind}
- file: ${sourceFile.fileName}
- location: ${line + 1}:${character + 1}
- snippet: ${snippet}`,
	);
}
