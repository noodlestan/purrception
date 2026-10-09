import { type TypeExpressionNode, createPrimitiveNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractArrayTypeNode } from './extractArrayTypeNode.js';
import { extractConditionalTypeNode } from './extractConditionalTypeNode.js';
import { extractFunctionTypeNode } from './extractFunctionTypeNode.js';
import { extractInferTypeNode } from './extractInferTypeNode.js';
import { extractIntersectionTypeNode } from './extractIntersectionTypeNode.js';
import { extractLiteralTypeNode } from './extractLiteralTypeNode.js';
import { extractMappedTypeNode } from './extractMappedTypeNode.js';
import { extractObjectLiteralTypeNode } from './extractObjectLiteralTypeNode.js';
import { extractOmitTypeNode } from './extractOmitTypeNode.js';
import { extractOperatorTypeExpression } from './extractOperatorTypeExpression.js';
import { extractPickTypeNode } from './extractPickTypeNode.js';
import { extractTemplateLiteralTypeNode } from './extractTemplateLiteralTypeNode.js';
import { extractTupleTypeNode } from './extractTupleTypeNode.js';
import { extractTypeRef } from './extractTypeRef.js';
import { extractUnionTypeNode } from './extractUnionTypeNode.js';
import { throwUnsupportedNodeError } from './throwUnsupportedNodeError.js';

const primitiveKinds = new Set([
	ts.SyntaxKind.NumberKeyword,
	ts.SyntaxKind.StringKeyword,
	ts.SyntaxKind.BooleanKeyword,
	ts.SyntaxKind.ObjectKeyword,
	ts.SyntaxKind.VoidKeyword,
	ts.SyntaxKind.UndefinedKeyword,
	ts.SyntaxKind.NullKeyword,
	ts.SyntaxKind.AnyKeyword,
	ts.SyntaxKind.UnknownKeyword,
	ts.SyntaxKind.NeverKeyword,
	ts.SyntaxKind.BigIntKeyword,
	ts.SyntaxKind.SymbolKeyword,
]);

/**
 * Recursive entry point to extract a structured TypeExpressionNode
 * Accepts any type-related node (top-level declarations or inline type nodes).
 */
export function extractTypeExpression(
	node:
		| ts.TypeNode
		| ts.TypeAliasDeclaration
		| ts.InterfaceDeclaration
		| ts.ExpressionWithTypeArguments,
): TypeExpressionNode {
	// readonly/keyof Foo
	if (ts.isTypeOperatorNode(node)) {
		return extractOperatorTypeExpression(node);
	}

	// type Foo = ...
	if (ts.isTypeAliasDeclaration(node)) {
		return extractTypeExpression(node.type);
	}

	// extends ExpressionWithTypeArguments, ExpressionWithTypeArguments
	if (ts.isExpressionWithTypeArguments(node)) {
		const { expression } = node;
		const name = expression.getText();
		if (name === 'Omit') {
			return extractOmitTypeNode(node);
		}
		if (name === 'Pick') {
			return extractPickTypeNode(node);
		}
		return extractTypeRef(node);
	}

	if (
		ts.isArrayTypeNode(node) ||
		(ts.isTypeReferenceNode(node) && node.typeName.getText() === 'Array')
	) {
		return extractArrayTypeNode(node);
	}

	if (ts.isTemplateLiteralTypeNode(node)) {
		return extractTemplateLiteralTypeNode(node);
	}

	if (ts.isTypeReferenceNode(node)) {
		const name = node.typeName.getText();
		if (name === 'Omit') {
			return extractOmitTypeNode(node);
		}
		if (name === 'Pick') {
			return extractPickTypeNode(node);
		}
		return extractTypeRef(node);
	}

	if (ts.isIndexedAccessTypeNode(node) || ts.isTypeQueryNode(node)) {
		return extractTypeRef(node);
	}
	if (ts.isTypeLiteralNode(node)) {
		return extractObjectLiteralTypeNode(node);
	}
	if (ts.isTupleTypeNode(node)) {
		return extractTupleTypeNode(node);
	}
	if (ts.isFunctionTypeNode(node)) {
		return extractFunctionTypeNode(node);
	}
	if (ts.isIntersectionTypeNode(node)) {
		return extractIntersectionTypeNode(node);
	}
	if (ts.isUnionTypeNode(node)) {
		return extractUnionTypeNode(node);
	}
	if (ts.isMappedTypeNode(node)) {
		return extractMappedTypeNode(node);
	}
	if (ts.isConditionalTypeNode(node)) {
		return extractConditionalTypeNode(node);
	}
	if (ts.isInferTypeNode(node)) {
		return extractInferTypeNode(node);
	}
	if (ts.isParenthesizedTypeNode(node)) {
		return extractTypeExpression(node.type);
	}
	if (ts.isLiteralTypeNode(node)) {
		return extractLiteralTypeNode(node);
	}

	if (primitiveKinds.has(node.kind)) {
		return createPrimitiveNode(node.getText());
	}

	throwUnsupportedNodeError(node, 'type expression');
}
