import type {
	ObjectIndexSignature,
	ObjectLiteralTypeMember,
	ObjectLiteralTypeNode,
} from '@purrception/lang-ts';
import ts from 'typescript';

import { extractNodeGenerics } from './extractNodeGenerics';
import { extractObjectLiteralTypeMember } from './extractObjectLiteralTypeMember';

export function extractObjectLiteralTypeNode(
	node: ts.InterfaceDeclaration | ts.TypeLiteralNode,
): ObjectLiteralTypeNode {
	const members: Record<string, ObjectLiteralTypeMember> = {};
	const indexSignatures: ObjectIndexSignature[] = [];

	const generic = extractNodeGenerics(node);

	for (const member of node.members) {
		const extracted = extractObjectLiteralTypeMember(member);

		if (!extracted) continue;

		if ('member' in extracted) {
			members[extracted.name] = extracted.member;
			continue;
		}

		indexSignatures.push(extracted.signature);
	}

	return {
		kind: 'object',
		generic,
		members,
		indexSignatures,
	};
}
