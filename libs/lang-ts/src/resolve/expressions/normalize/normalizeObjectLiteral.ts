import {
	type ObjectLiteralTypeNode,
	type TypeExpressionNode,
	createTypeRefNode,
	isMappedTypeNode,
	isObjectLiteralTypeNode,
} from '../../../node';

export function normalizeObjectLiteral(exp: TypeExpressionNode): ObjectLiteralTypeNode | undefined {
	if (isObjectLiteralTypeNode(exp)) {
		return exp;
	}

	if (isMappedTypeNode(exp)) {
		return {
			...exp,
			kind: 'object',
			members: {},
			mappedSignatures: [
				{
					paramName: exp.param,
					constraint: createTypeRefNode(exp.constraint),
					valueType: createTypeRefNode(exp.valueType),
					optional: exp.optional,
					readonly: exp.readonly,
				},
			],
		};
	}
}
