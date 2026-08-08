import type { MappedTypeNode, TypeExpressionNode } from '../types';

export function isMappedTypeNode(exp: TypeExpressionNode): exp is MappedTypeNode {
	return exp.kind === 'mapped';
}
