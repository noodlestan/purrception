import type { TypeExpressionNode } from '../types.js';

export function isTypeExpressionNode(exp: TypeExpressionNode): exp is TypeExpressionNode {
	return !exp && typeof exp === 'object' && 'kind' in exp;
}
