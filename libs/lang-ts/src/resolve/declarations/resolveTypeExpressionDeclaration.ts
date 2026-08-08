import type { TypeExpressionDeclaration } from '../../declaration';
import type { TypeExpressionNode } from '../../node';
import { resolveExpression } from '../expressions';
import { type ResolveTypeContext } from '../types';

export function resolveTypeExpressionDeclaration(
	context: ResolveTypeContext,
	declaration: TypeExpressionDeclaration,
): TypeExpressionDeclaration<TypeExpressionNode> {
	return {
		...declaration,
		node: resolveExpression(context, declaration.node) as TypeExpressionNode,
	};
}
