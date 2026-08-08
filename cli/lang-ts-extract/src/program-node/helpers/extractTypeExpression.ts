import { type TypeExpressionNode, createPrimitiveNode } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractArrayTypeNode } from './extractArrayTypeNode';
import { extractConditionalTypeNode } from './extractConditionalTypeNode';
import { extractFunctionTypeNode } from './extractFunctionTypeNode';
import { extractInferTypeNode } from './extractInferTypeNode';
import { extractIntersectionTypeNode } from './extractIntersectionTypeNode';
import { extractLiteralTypeNode } from './extractLiteralTypeNode';
import { extractMappedTypeNode } from './extractMappedTypeNode';
import { extractObjectLiteralTypeNode } from './extractObjectLiteralTypeNode';
import { extractOmitTypeNode } from './extractOmitTypeNode';
import { extractOperatorTypeExpression } from './extractOperatorTypeExpression';
import { extractPickTypeNode } from './extractPickTypeNode';
import { extractTemplateLiteralTypeNode } from './extractTemplateLiteralTypeNode';
import { extractTupleTypeNode } from './extractTupleTypeNode';
import { extractTypeRef } from './extractTypeRef';
import { extractUnionTypeNode } from './extractUnionTypeNode';
import { throwUnsupportedNodeError } from './throwUnsupportedNodeError';

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
