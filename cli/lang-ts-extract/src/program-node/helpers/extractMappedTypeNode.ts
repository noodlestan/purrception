import type { MappedTypeNode } from '@purrception/lang-ts';
import type ts from 'typescript';

export function extractMappedTypeNode(node: ts.MappedTypeNode): MappedTypeNode {
	const param = node.typeParameter.name.getText();
	const constraint = node.typeParameter.constraint?.getText() ?? 'any';
	const valueType = node.type ? node.type.getText() : 'any';

	return {
		kind: 'mapped',
		param,
		constraint,
		valueType,
		optional: Boolean(node.questionToken),
		readonly: Boolean(node.readonlyToken),
	};
}
