import { type TypeExpressionNode } from '../../node/index.js';
import type { ResolveTypeContext } from '../types.js';

import { resolveOperator } from './kinds/index.js';
import { resolveIntersection } from './kinds/resolveIntersection.js';
import { resolveObject } from './kinds/resolveObject.js';
import { resolveOmit } from './kinds/resolveOmit.js';
import { resolvePick } from './kinds/resolvePick.js';
import { resolveTypeRefNode } from './kinds/resolveTypeRefNode.js';
import { resolveUnion } from './kinds/resolveUnion.js';

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
