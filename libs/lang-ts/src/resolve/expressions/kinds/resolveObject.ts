import type { ObjectLiteralTypeMember, ObjectLiteralTypeNode } from '../../../node';
import { hasTag } from '../../helpers';
import type { ResolveTypeContext } from '../../types';
import { resolveExpression } from '../resolveExpression';

export function resolveObject(
	context: ResolveTypeContext,
	exp: ObjectLiteralTypeNode,
): ObjectLiteralTypeNode {
	const resolvedMembers: Record<string, ObjectLiteralTypeMember> = {};

	for (const key in exp.members) {
		const member = exp.members[key];
		if (!member) {
			continue;
		}

		if (hasTag(member, 'noresolve')) {
			// console.log('NO RESOLVE', member);
			resolvedMembers[key] = member;
			continue;
		}

		const node = resolveExpression(context, member.type);

		if (hasTag(node, 'noresolve')) {
			// console.log('NO RESOLVE member resolve type', member);
			resolvedMembers[key] = {
				...member,
				tags: { ...(member.tags || {}), noresolve: '' },
			};
			continue;
		}

		resolvedMembers[key] = {
			...member,
			type: { ...node, _source: exp._source },
		};
	}

	return {
		...exp,
		members: resolvedMembers,
	};
}
