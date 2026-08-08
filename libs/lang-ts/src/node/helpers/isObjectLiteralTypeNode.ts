import type { ObjectLiteralTypeNode, TypeExpressionNode } from '../types';

export function isObjectLiteralTypeNode(exp: TypeExpressionNode): exp is ObjectLiteralTypeNode {
	return exp.kind === 'object';
}
