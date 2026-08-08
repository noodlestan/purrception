import type { PickTypeNode, TypeRefNode, UnionTypeNode } from '@purrception/lang-ts';
import type ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractPickTypeNode(
	node: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments,
): PickTypeNode {
	const [sourceNode, membersNode] = node.typeArguments ?? [];

	const source = extractTypeExpression(sourceNode);
	const members = extractTypeExpression(membersNode) as TypeRefNode | UnionTypeNode;

	return {
		kind: 'pick',
		source,
		members,
	};
}
