import type { LiteralTypeNode, TypeExpressionNode } from '../types';

export function isLiteralTypeNode(
	exp: TypeExpressionNode,
	valueType?: 'string' | 'number' | 'boolean',
): exp is LiteralTypeNode {
	if (exp.kind !== 'literal') {
		return false;
	}

	switch (valueType) {
		case undefined:
			return true;

		case 'string':
			return typeof exp.value === 'string';

		case 'number':
			return typeof exp.value === 'number';

		case 'boolean':
			return typeof exp.value === 'boolean';
	}
}
