import type { EntityDataBase } from '@purrception/primitives';

import type { TypeExpressionNode } from '../node';

import type { ResolveTypeContext } from './types';

const stackKey = (entity: EntityDataBase, type: string): string => {
	return `${entity.package}/${entity.name}/${type}`;
};

const createStackHasEntry = (stack: Set<string>) => {
	const stackHasEntry = (entity: EntityDataBase, type: string): boolean => {
		return stack.has(stackKey(entity, type));
	};
	return stackHasEntry;
};

const createResolveImportName = (entity: EntityDataBase) => {
	const resolveImportName = (name: string): string => {
		const alias = entity.symbols.imported[name];
		return alias ? alias.name : name;
	};
	return resolveImportName;
};

export function createResolveTypeContext(
	resolveEntity: (entity: EntityDataBase, type: string) => EntityDataBase | undefined,
	entity: EntityDataBase,
): ResolveTypeContext {
	const stack = new Set<string>();

	const createChildContext = (
		entity: EntityDataBase,
		type: string,
		params: TypeExpressionNode[] = [],
	): ResolveTypeContext => {
		const key = stackKey(entity, type);
		if (stack.has(key)) {
			throw new Error(`Circular reference: ${key}.`);
		}
		const newStack = new Set(stack);
		newStack.add(key);
		return {
			entity,
			params,
			stack: newStack,
			resolveImportName: createResolveImportName(entity),
			resolveEntity,
			stackHasEntry: createStackHasEntry(newStack),
			createChildContext,
		};
	};

	return {
		entity,
		stack,
		resolveImportName: createResolveImportName(entity),
		resolveEntity,
		stackHasEntry: createStackHasEntry(stack),
		createChildContext,
	};
}
