import type { IntersectionTypeNode, TypeExpressionNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractIntersectionTypeNode(node: ts.IntersectionTypeNode): IntersectionTypeNode {
	const entries: TypeExpressionNode[] = node.types.map(typeNode => extractTypeExpression(typeNode));

	return {
		kind: 'intersection',
		entries,
	};
}
