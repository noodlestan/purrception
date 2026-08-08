import type { TemplateLiteralTypeNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractTypeExpression } from './extractTypeExpression';

export function extractTemplateLiteralTypeNode(
	node: ts.TemplateLiteralTypeNode,
): TemplateLiteralTypeNode {
	const spans = node.templateSpans.map(span => ({
		type: extractTypeExpression(span.type),
		text: span.literal.text,
	}));

	return {
		kind: 'template-literal',
		head: node.head.text,
		spans,
	};
}
