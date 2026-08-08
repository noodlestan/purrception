import { type OperatorTypeNode, type TypeExpressionNode } from '../../../node';
import type { ResolveTypeContext } from '../../types';
import { resolveOperatorKeyOf } from '../operators';

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
