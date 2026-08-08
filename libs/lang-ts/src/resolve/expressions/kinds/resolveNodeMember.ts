import { type TypeExpressionNode, isObjectLiteralTypeNode } from '../../../node';

export function resolveNodeMember(
	node: TypeExpressionNode,
	member: string,
): TypeExpressionNode | undefined {
	if (!isObjectLiteralTypeNode(node)) {
		return undefined;
	}

	const targetMember = node.members[member];
	if (!targetMember) {
		return undefined;
	}

	return { ...targetMember.type, _source: targetMember._source || node._source };
}
