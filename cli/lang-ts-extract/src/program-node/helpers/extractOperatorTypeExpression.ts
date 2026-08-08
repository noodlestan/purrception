import type { OperatorTypeNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

const operatorMap: Partial<Record<ts.SyntaxKind, string>> = {
	[ts.SyntaxKind.ReadonlyKeyword]: 'readonly',
	[ts.SyntaxKind.KeyOfKeyword]: 'keyof',
	[ts.SyntaxKind.UniqueKeyword]: 'unique',
};

export function extractOperatorTypeExpression(node: ts.TypeOperatorNode): OperatorTypeNode {
	return {
		kind: 'operator',
		operator: operatorMap[node.operator] ?? ts.SyntaxKind[node.operator] ?? 'unknown',
		operand: extractTypeExpression(node.type),
	};
}
