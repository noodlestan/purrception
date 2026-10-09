import type { IntersectionTypeNode, TypeExpressionNode } from '../types.js';

export function isIntersectionTypeNode(exp: TypeExpressionNode): exp is IntersectionTypeNode {
	return exp.kind === 'intersection';
}
