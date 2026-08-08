import type { InferTypeNode } from '@purrception/lang-ts';
import type ts from 'typescript';

export function extractInferTypeNode(node: ts.InferTypeNode): InferTypeNode {
	return {
		kind: 'infer',
		name: node.typeParameter.name.getText(),
	};
}
