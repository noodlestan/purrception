import {
	type OperatorTypeNode,
	type TypeExpressionNode,
	isObjectLiteralTypeNode,
} from '../../../node/index.js';
import type { ResolveTypeContext } from '../../types.js';
import { resolveExpression } from '../resolveExpression.js';

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
