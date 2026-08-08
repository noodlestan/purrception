import type { TypeRefNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeRef } from './extractTypeRef';

export function extractVariableFunctionType(node: ts.VariableDeclaration): TypeRefNode | undefined {
	if (!node.type) {
		return undefined;
	}

	if (!ts.isTypeReferenceNode(node.type)) {
		return undefined;
	}

	return extractTypeRef(node.type);
}
