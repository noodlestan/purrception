import type { PrimitiveNode } from '../types';

export function createPrimitiveNode(primitive: string): PrimitiveNode {
	return { kind: 'primitive', primitive };
}
