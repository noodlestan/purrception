import type { ObjectLiteralTypeNode, TypeExpressionNode } from '../types.js';

export function isObjectLiteralTypeNode(exp: TypeExpressionNode): exp is ObjectLiteralTypeNode {
	return exp.kind === 'object';
}
