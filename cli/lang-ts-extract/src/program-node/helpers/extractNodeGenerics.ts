import { type TypeExpressionGeneric, createPrimitiveNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeRef } from './extractTypeRef';

export function extractNodeGenerics(node: ts.Node): TypeExpressionGeneric[] | undefined {
	if (!('typeParameters' in node)) {
		return undefined;
	}

	const typeParameters = (
		node as ts.SignatureDeclaration | ts.InterfaceDeclaration | ts.TypeAliasDeclaration
	).typeParameters;
	if (!typeParameters) {
		return undefined;
	}

	return typeParameters.map(param => ({
		name: param.name.getText(),
		constraint: param.constraint
			? extractTypeRef(param.constraint)
			: createPrimitiveNode('unknown'),
		default: param.default ? extractTypeRef(param.default) : undefined,
	}));
}
