import type { ArrayTypeNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractArrayTypeNode(node: ts.ArrayTypeNode | ts.TypeReferenceNode): ArrayTypeNode {
	if (ts.isArrayTypeNode(node)) {
		return {
			kind: 'array',
			elements: extractTypeExpression(node.elementType),
		};
	}

	if (
		ts.isTypeReferenceNode(node) &&
		node.typeName.getText() === 'Array' &&
		node.typeArguments?.length === 1
	) {
		return {
			kind: 'array',
			elements: extractTypeExpression(node.typeArguments?.[0]),
		};
	}
	throw new Error('Unexpected node in extractArrayTypeNode');
}
