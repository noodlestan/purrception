import { type TypeExpressionNode } from '../../node';
import type { ResolveTypeContext } from '../types';

import { resolveOperator } from './kinds';
import { resolveIntersection } from './kinds/resolveIntersection';
import { resolveObject } from './kinds/resolveObject';
import { resolveOmit } from './kinds/resolveOmit';
import { resolvePick } from './kinds/resolvePick';
import { resolveTypeRefNode } from './kinds/resolveTypeRefNode';
import { resolveUnion } from './kinds/resolveUnion';

export function resolveExpression(
	context: ResolveTypeContext,
	exp: TypeExpressionNode,
): TypeExpressionNode {
	switch (exp.kind) {
		case 'ref':
			return resolveTypeRefNode(context, exp);
		case 'primitive':
			return exp;
		case 'object':
			return resolveObject(context, exp);
		case 'intersection':
			return resolveIntersection(context, exp);
		case 'union':
			return resolveUnion(context, exp);
		case 'pick':
			return resolvePick(context, exp);
		case 'omit':
			return resolveOmit(context, exp);
		case 'literal':
			return exp;
		case 'array':
			return exp;
		case 'tuple':
			return exp;
		case 'template-literal':
			return exp;
		case 'operator':
			return resolveOperator(context, exp);
		case 'mapped':
			return exp;
		case 'conditional':
			return exp;
		case 'infer':
			return exp;
		case 'function':
			return exp;
		default:
			throw new Error(`Unknown expression kind ${(exp as TypeExpressionNode).kind} in expression`);
	}
}
