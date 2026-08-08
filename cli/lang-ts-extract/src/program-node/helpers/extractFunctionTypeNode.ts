import type { FunctionTypeNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractFunctionParams } from './extractFunctionParams';
import { extractFunctionReturns } from './extractFunctionReturns';
import { extractNodeGenerics } from './extractNodeGenerics';

export function extractFunctionTypeNode(node: ts.FunctionTypeNode): FunctionTypeNode {
	const generic = extractNodeGenerics(node);
	const params = extractFunctionParams(node.parameters);
	const returns = extractFunctionReturns(node.type);

	return {
		kind: 'function',
		generic,
		params,
		returns,
	};
}
