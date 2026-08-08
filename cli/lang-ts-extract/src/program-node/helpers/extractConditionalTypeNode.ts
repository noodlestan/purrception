import type { ConditionalTypeNode } from '@purrception/lang-ts';
import type ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractConditionalTypeNode(node: ts.ConditionalTypeNode): ConditionalTypeNode {
	return {
		kind: 'conditional',
		checkType: extractTypeExpression(node.checkType),
		extendsType: extractTypeExpression(node.extendsType),
		trueType: extractTypeExpression(node.trueType),
		falseType: extractTypeExpression(node.falseType),
	};
}
