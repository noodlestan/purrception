import {
	type InterfaceDeclaration,
	type TypeDeclaration,
	type TypeExpressionDeclaration,
} from '../declaration/index.js';
import { type TypeExpressionNode, type TypeResolutionMeta } from '../node/index.js';

import {
	resolveInterfaceDeclaration,
	resolveTypeExpressionDeclaration,
} from './declarations/index.js';
import type { ResolveTypeContext } from './types.js';

export function resolveTypeDeclaration(
	context: ResolveTypeContext,
	declaration: TypeDeclaration,
): TypeExpressionDeclaration<TypeExpressionNode> {
	const resolution: TypeResolutionMeta = {
		ref: declaration.name,
		entity: context.entity,
	};

	let dec = declaration;
	switch (declaration.kind) {
		case 'type':
			dec = resolveTypeExpressionDeclaration(context, declaration as TypeExpressionDeclaration);
			break;
		case 'interface':
			dec = resolveInterfaceDeclaration(context, declaration as InterfaceDeclaration);
			break;
	}

	return { ...dec, node: { ...dec.node, _source: dec.node._source || resolution } };
}
