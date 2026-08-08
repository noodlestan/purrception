import type { UnionTypeNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractUnionTypeNode(node: ts.UnionTypeNode): UnionTypeNode {
	const entries = node.types.map(typeNode => extractTypeExpression(typeNode));

	return {
		kind: 'union',
		entries,
	};
}
