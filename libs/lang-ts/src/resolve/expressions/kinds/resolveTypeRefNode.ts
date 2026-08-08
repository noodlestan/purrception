import { isInterfaceDeclaration, isTypeDeclaration } from '../../../declaration';
import { type TypeExpressionNode, type TypeRefNode, isBuiltInToken } from '../../../node';
import { resolveTypeDeclaration } from '../../resolveTypeDeclaration';
import type { ResolveTypeContext } from '../../types';

import { resolveNodeMember } from './resolveNodeMember';

export function resolveTypeRefNode(
	context: ResolveTypeContext,
	node: TypeRefNode,
): TypeExpressionNode {
	if (isBuiltInToken(node.ref)) {
		return node;
	}

	const targetEntity =
		node.ref in context.entity.symbols.imported
			? context.resolveEntity(context.entity, node.ref)
			: context.entity;
	if (!targetEntity) {
		return node;
	}

	const targetType = context.resolveImportName(node.ref);
	if (context.stackHasEntry(targetEntity, targetType)) {
		console.warn(`Circular reference: ${targetType}.`, context.stack);
		return node;
	}

	const type = targetEntity.symbols.declared[targetType];
	if (!type) {
		return node;
	}

	if (!isTypeDeclaration(type) && !isInterfaceDeclaration(type)) {
		console.warn(`Invalid type reference: ${targetType}.`, type);
		return node;
	}

	const nestedContext = context.createChildContext(targetEntity, targetType, node.params);
	const resolvedDeclaration = resolveTypeDeclaration(nestedContext, type);

	const resolvedNode = resolvedDeclaration.node;

	if (node.member) {
		const resolvedMember = resolveNodeMember(resolvedNode, node.member);
		if (!resolvedMember) {
			return node;
		}
		return resolvedMember;
	}

	return resolvedNode;
}
