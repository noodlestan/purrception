import type { PrimitiveNode } from '../types.js';

export function createPrimitiveNode(primitive: string): PrimitiveNode {
	return { kind: 'primitive', primitive };
}
