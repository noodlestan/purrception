import { PurrceptionLanguageId } from '../../constants';
import type { InterfaceDeclaration, TypeExpressionDeclaration } from '../../declaration';
import type { ObjectLiteralTypeMember, ObjectLiteralTypeNode } from '../../node';
import { resolveExpression } from '../expressions';
import { hasTag } from '../helpers';
import { type ResolveTypeContext } from '../types';

function mergeObject(
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
			type: { ...node, _source: member._source || source._source },
		};
	}
}

export function resolveInterfaceDeclaration(
	context: ResolveTypeContext,
	declaration: InterfaceDeclaration,
): TypeExpressionDeclaration<ObjectLiteralTypeNode> {
	const { at, name, node } = declaration;
	const { generic, members = {}, heritage = [], ...rest } = node;

	const object: ObjectLiteralTypeNode = {
		...rest,
		kind: 'object',
		generic,
		members: {},
	};

	for (const h of heritage) {
		const node = resolveExpression(context, h);
		if (node.kind === 'object') {
			mergeObject(context, object, node);
		}
	}

	for (const key in members) {
		const member = members[key] as ObjectLiteralTypeMember;

		if (hasTag(member, 'noresolve')) {
			// console.log('NO RESOLVE', member);
			object.members[key] = member;
			continue;
		}

		const node = resolveExpression(context, member.type);

		if (hasTag(node, 'noresolve')) {
			// console.log('NO RESOLVE member resolve type', member);
			object.members[key] = {
				...member,
				tags: { ...(member.tags || {}), noresolve: '' },
			};
			continue;
		}

		object.members[key] = {
			...member,
			type: { ...node, _source: member._source },
		};
	}

	return {
		at,
		lang: PurrceptionLanguageId,
		name,
		kind: 'type',
		private: declaration.private,
		node: object,
	};
}
