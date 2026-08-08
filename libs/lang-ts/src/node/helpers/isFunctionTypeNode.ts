import type { FunctionTypeNode, TypeExpressionNode } from '../types';

export function isFunctionTypeNode(node: TypeExpressionNode): node is FunctionTypeNode {
	return node.kind === 'function';
}
