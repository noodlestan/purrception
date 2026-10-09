import type { MappedTypeNode, TypeExpressionNode } from '../types.js';

export function isMappedTypeNode(exp: TypeExpressionNode): exp is MappedTypeNode {
	return exp.kind === 'mapped';
}
