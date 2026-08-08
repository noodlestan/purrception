import {
	type OperatorTypeNode,
	type TypeExpressionNode,
	isObjectLiteralTypeNode,
} from '../../../node';
import type { ResolveTypeContext } from '../../types';
import { resolveExpression } from '../resolveExpression';

export function resolveOperatorKeyOf(
	context: ResolveTypeContext,
	exp: OperatorTypeNode,
): TypeExpressionNode {
	const resolved = resolveExpression(context, exp.operand);

	if (!isObjectLiteralTypeNode(resolved)) {
		return exp;
	}

	return {
		kind: 'union',
		entries: Object.keys(resolved.members).map(member => ({
			kind: 'literal',
			value: member,
		})),
	};
}
