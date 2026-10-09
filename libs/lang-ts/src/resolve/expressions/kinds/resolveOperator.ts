import { type OperatorTypeNode, type TypeExpressionNode } from '../../../node/index.js';
import type { ResolveTypeContext } from '../../types.js';
import { resolveOperatorKeyOf } from '../operators/index.js';

export function resolveOperator(
	context: ResolveTypeContext,
	exp: OperatorTypeNode,
): TypeExpressionNode {
	switch (exp.operator) {
		case 'keyof':
			return resolveOperatorKeyOf(context, exp);

		default:
			return exp;
	}
}
