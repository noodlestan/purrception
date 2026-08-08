import type { TypeExpressionNode, UnionTypeNode } from '../types';

export function isUnionTypeNode(exp: TypeExpressionNode): exp is UnionTypeNode {
	return exp.kind === 'union';
}
