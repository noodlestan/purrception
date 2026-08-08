import {
	type FunctionJsDocData,
	type FunctionTypeParam,
	createPrimitiveNode,
} from '@purrception/lang-ts';
import type ts from 'typescript';

import { extractNodeJsDoc } from '../../jsdoc';

import { extractTypeExpression } from './extractTypeExpression';

export function extractFunctionParams(
	params: readonly ts.ParameterDeclaration[],
	functionJsDoc?: FunctionJsDocData,
): FunctionTypeParam[] {
	return params.map(param => {
		const name = param.name.getText();
		const { description, tags } = extractNodeJsDoc(param);

		const type = param.type ? extractTypeExpression(param.type) : createPrimitiveNode('unknown');
		const optional = Boolean(param.questionToken);

		return {
			name,
			type,
			optional,
			description: description || functionJsDoc?.paramTags?.[name],
			tags,
		};
	});
}
