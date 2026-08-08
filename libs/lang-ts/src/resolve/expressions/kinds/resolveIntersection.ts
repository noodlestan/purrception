import {
	type IntersectionTypeNode,
	type ObjectLiteralTypeMember,
	type ObjectLiteralTypeNode,
} from '../../../node';
import { hasTag } from '../../helpers';
import type { ResolveTypeContext } from '../../types';
import { normalizeObjectLiteral } from '../normalize';
import { resolveExpression } from '../resolveExpression';

function mergeMembers(
	context: ResolveTypeContext,
	target: ObjectLiteralTypeNode,
	source: ObjectLiteralTypeNode,
) {
	for (const key in source.members) {
		const member = source.members[key] as ObjectLiteralTypeMember;

		if (hasTag(member, 'noresolve')) {
			// console.log('NO RESOLVE', member);
			target.members[key] = member;
			continue;
		}

		const node = resolveExpression(context, member.type);

		if (hasTag(node, 'noresolve')) {
			// console.log('NO RESOLVE member resolve type', member);
			target.members[key] = {
				...member,
				tags: { ...(member.tags || {}), noresolve: '' },
			};
			continue;
		}

		target.members[key] = {
			...member,
			type: { ...node, _source: node._source || source._source },
		};
	}
}

function mergeObject(
	context: ResolveTypeContext,
	target: ObjectLiteralTypeNode,
	source: ObjectLiteralTypeNode,
) {
	mergeMembers(context, target, source);

	if (target.indexSignatures && source.indexSignatures?.length) {
		target.indexSignatures.push(
			...source.indexSignatures.map(sig => ({
				...sig,
				_source: sig._source || source._source,
			})),
		);
	}

	if (target.mappedSignatures && source.mappedSignatures?.length) {
		target.mappedSignatures.push(
			...source.mappedSignatures.map(sig => ({
				...sig,
				_source: sig._source || source._source,
			})),
		);
	}
}

export function resolveIntersection(
	context: ResolveTypeContext,
	exp: IntersectionTypeNode,
): ObjectLiteralTypeNode {
	const resolvedEntries: ObjectLiteralTypeNode[] = [];

	for (const entry of exp.entries) {
		const node = resolveExpression(context, entry);
		const normalized = normalizeObjectLiteral(node);

		if (normalized) {
			resolvedEntries.push(normalized);
		} else {
			console.warn(`Unresolvable intersection member:`, entry);
		}
	}

	const object: ObjectLiteralTypeNode = {
		kind: 'object',
		members: {},
		indexSignatures: [],
		mappedSignatures: [],
		_source: exp._source,
	};

	for (const entry of resolvedEntries) {
		mergeObject(context, object, entry);
	}

	return object;
}
