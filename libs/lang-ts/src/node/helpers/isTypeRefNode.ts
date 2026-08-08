import type { TypeExpressionNode, TypeRefNode } from '../types';

export function isTypeRefNode(exp: TypeExpressionNode): exp is TypeRefNode {
	return exp.kind === 'ref';
}
