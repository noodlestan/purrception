import {
	type ObjectIndexSignature,
	type ObjectLiteralTypeMember,
	createPrimitiveNode,
} from '@purrception/lang-ts';
import ts from 'typescript';

import { extractNodeJsDoc } from '../../jsdoc';

import { extractTypeExpression } from './extractTypeExpression';

type ExtractedObjectMember = {
	name: string;
	member: ObjectLiteralTypeMember;
};

type ExtractedObjectIndexSignature = {
	signature: ObjectIndexSignature;
};

type ExtractedObjectElement = ExtractedObjectMember | ExtractedObjectIndexSignature;

function hasReadonlyModifier(
	node: ts.PropertySignature | ts.MethodSignature | ts.IndexSignatureDeclaration,
): boolean {
	return Boolean(node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ReadonlyKeyword));
}

export function extractObjectLiteralTypeMember(
	element: ts.TypeElement,
): ExtractedObjectElement | undefined {
	const { description, tags } = extractNodeJsDoc(element);

	if (ts.isPropertySignature(element)) {
		return {
			name: element.name.getText(),
			member: {
				optional: Boolean(element.questionToken),
				readonly: hasReadonlyModifier(element),
				type: element.type ? extractTypeExpression(element.type) : createPrimitiveNode('unknown'),
				description,
				tags,
			},
		};
	}

	if (ts.isMethodSignature(element) && element.type) {
		return {
			name: element.name.getText(),
			member: {
				optional: Boolean(element.questionToken),
				type: extractTypeExpression(element.type),
				description,
				tags,
			},
		};
	}

	if (ts.isIndexSignatureDeclaration(element)) {
		const param = element.parameters[0];

		return {
			signature: {
				keyName: param?.name.getText() ?? 'key',
				keyType: param?.type ? extractTypeExpression(param.type) : createPrimitiveNode('unknown'),
				valueType: element.type
					? extractTypeExpression(element.type)
					: createPrimitiveNode('unknown'),
				readonly: hasReadonlyModifier(element),
				description,
				tags,
			},
		};
	}
}
