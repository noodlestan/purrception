import {
	type OmitTypeNode,
	type TypeExpressionNode,
	isLiteralTypeNode,
	isObjectLiteralTypeNode,
} from '../../../node';
import { hasTag } from '../../helpers';
import type { ResolveTypeContext } from '../../types';
import { normalizeUnion } from '../normalize';
import { resolveExpression } from '../resolveExpression';

export function resolveOmit(context: ResolveTypeContext, exp: OmitTypeNode): TypeExpressionNode {
	const { source, members: expMembers, ...rest } = exp;
	const node = resolveExpression(context, source);

	if (isObjectLiteralTypeNode(node)) {
		const normalizedMembers = normalizeUnion(resolveExpression(context, expMembers));
		const baseMembers = node.members;

		const omitted = new Set<string>();
		for (const entry of normalizedMembers.entries) {
			if (isLiteralTypeNode(entry) && typeof entry.value === 'string') {
				omitted.add(entry.value);
			}
		}

		const members: typeof baseMembers = {};

		for (const key in baseMembers) {
			if (omitted.has(key)) {
				continue;
			}

			const member = baseMembers[key];

			if (!member) {
				continue;
			}

			if (hasTag(member, 'noresolve')) {
				// console.log('NO RESOLVE', member);
				members[key] = member;
				continue;
			}

			const node = resolveExpression(context, member.type);

			if (hasTag(node, 'noresolve')) {
				// console.log('NO RESOLVE member resolve type', member);
				members[key] = {
					...member,
					tags: { ...(member.tags || {}), noresolve: '' },
				};
				continue;
			}

			members[key] = {
				...member,
				type: {
					...node,
					_source: node._source || member._source || node._source || exp._source,
				},
			};
		}

		return {
			...rest,
			kind: 'object',
			members,
		};
	}

	return node;
}
