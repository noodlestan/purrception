import {
	type TypeExpressionNode,
	type UnionTypeNode,
	isLiteralTypeNode,
	isUnionTypeNode,
} from '../../../node';

export function normalizeUnion(exp: TypeExpressionNode): UnionTypeNode {
	if (isUnionTypeNode(exp)) {
		return exp;
	}

	if (isLiteralTypeNode(exp)) {
		return {
			kind: 'union',
			entries: [exp],
		};
	}

	console.warn(`Unsupported union type candidate:`, exp);
	return {
		kind: 'union',
		entries: [],
	};
}
