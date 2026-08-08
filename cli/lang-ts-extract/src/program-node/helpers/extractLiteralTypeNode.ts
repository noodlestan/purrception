import type { LiteralTypeNode } from '@purrception/lang-ts';
import ts from 'typescript';

export function extractLiteralTypeNode(node: ts.LiteralTypeNode): LiteralTypeNode {
	const valueNode = node.literal;
	let value: string | number | boolean;

	if (ts.isNumericLiteral(valueNode)) {
		value = Number(valueNode.text);
	} else if (ts.isStringLiteral(valueNode)) {
		value = valueNode.text;
	} else if (valueNode.kind === ts.SyntaxKind.TrueKeyword) {
		value = true;
	} else if (valueNode.kind === ts.SyntaxKind.FalseKeyword) {
		value = false;
	} else {
		value = valueNode.getText(); // fallback
	}

	return {
		kind: 'literal',
		value,
	};
}
