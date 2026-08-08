import { type TypeRefNode, createTypeRefNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractTypeRef(node: ts.TypeNode): TypeRefNode {
	if (ts.isTypeReferenceNode(node)) {
		const baseName = node.typeName.getText();

		let params: TypeRefNode['params'] | undefined;

		if (node.typeArguments?.length) {
			params = node.typeArguments.map(arg => extractTypeExpression(arg));
		}

		return createTypeRefNode(baseName, params);
	}

	if (ts.isIndexedAccessTypeNode(node)) {
		const objectType = extractTypeRef(node.objectType);

		const key =
			ts.isLiteralTypeNode(node.indexType) && ts.isStringLiteral(node.indexType.literal)
				? node.indexType.literal.text
				: undefined;

		if (!key) {
			return objectType;
		}

		return {
			...objectType,
			member: key,
		};
	}

	return createTypeRefNode(node.getText());
}
