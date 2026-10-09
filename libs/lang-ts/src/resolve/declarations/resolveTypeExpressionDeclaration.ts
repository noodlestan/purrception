import type { TypeExpressionDeclaration } from '../../declaration/index.js';
import type { TypeExpressionNode } from '../../node/index.js';
import { resolveExpression } from '../expressions/index.js';
import { type ResolveTypeContext } from '../types.js';

export function resolveTypeExpressionDeclaration(
	context: ResolveTypeContext,
	declaration: TypeExpressionDeclaration,
): TypeExpressionDeclaration<TypeExpressionNode> {
	return {
		...declaration,
		node: resolveExpression(context, declaration.node) as TypeExpressionNode,
	};
}
