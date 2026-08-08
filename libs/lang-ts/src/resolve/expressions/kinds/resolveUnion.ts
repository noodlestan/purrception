import { type TypeExpressionNode, type UnionTypeNode, isUnionTypeNode } from '../../../node';
import type { ResolveTypeContext } from '../../types';
import { resolveExpression } from '../resolveExpression';

function withSource<T extends TypeExpressionNode>(
	node: T,
	source: TypeExpressionNode['_source'],
): T {
	return node._source ? node : { ...node, _source: source };
}

export function resolveUnion(context: ResolveTypeContext, exp: UnionTypeNode): UnionTypeNode {
	const resolvedEntries: TypeExpressionNode[] = [];

	for (const entry of exp.entries) {
		const resolved = resolveExpression(context, entry);

		if (isUnionTypeNode(resolved)) {
			for (const unionEntry of resolved.entries) {
				resolvedEntries.push(withSource(unionEntry, unionEntry._source || resolved._source));
			}
			continue;
		}

		resolvedEntries.push(resolved);
	}

	return {
		...exp,
		entries: resolvedEntries,
	};
}
