import type { TypeExpressionNode, UnionTypeNode } from '../types.js';

export function isUnionTypeNode(exp: TypeExpressionNode): exp is UnionTypeNode {
	return exp.kind === 'union';
}
