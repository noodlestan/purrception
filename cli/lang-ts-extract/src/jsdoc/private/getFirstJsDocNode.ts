import ts from 'typescript';

export function getFirstJsDocNode(node: ts.Node): ts.JSDoc | undefined {
	if (ts.isJSDoc(node)) {
		return node;
	}

	for (const child of node.getChildren()) {
		const result = getFirstJsDocNode(child);
		if (result) {
			return result;
		}
	}

	return undefined;
}
