import type { FunctionTypeNode, TypeExpressionNode } from '../types.js';

export function isFunctionTypeNode(node: TypeExpressionNode): node is FunctionTypeNode {
	return node.kind === 'function';
}
