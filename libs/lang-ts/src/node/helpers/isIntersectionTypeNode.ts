import type { IntersectionTypeNode, TypeExpressionNode } from '../types';

export function isIntersectionTypeNode(exp: TypeExpressionNode): exp is IntersectionTypeNode {
	return exp.kind === 'intersection';
}
