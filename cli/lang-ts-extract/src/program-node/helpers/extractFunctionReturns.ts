import {
	type FunctionJsDocData,
	type FunctionTypeReturns,
	createPrimitiveNode,
} from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractFunctionReturns(
	returnType: ts.TypeNode | undefined,
	jsDoc?: FunctionJsDocData,
): FunctionTypeReturns {
	if (!returnType) {
		return { type: createPrimitiveNode('void') };
	}

	if (ts.isTypePredicateNode(returnType)) {
		const asserts = {
			parameter: returnType.parameterName.getText(),
			type: returnType.type
				? extractTypeExpression(returnType.type)
				: createPrimitiveNode('unknown'),
		};

		return {
			type: createPrimitiveNode('boolean'),
			description: jsDoc?.returnsTag,
			asserts,
		};
	}

	const type = extractTypeExpression(returnType);

	return {
		type,
		description: jsDoc?.returnsTag,
	};
}
