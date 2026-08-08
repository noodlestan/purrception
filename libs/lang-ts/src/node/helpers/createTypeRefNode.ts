import type { TypeExpressionNode, TypeRefNode } from '../types';

export function createTypeRefNode(ref: string, params?: TypeExpressionNode[]): TypeRefNode {
	return { kind: 'ref', ref, params };
}
