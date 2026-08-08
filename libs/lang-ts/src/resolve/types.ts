import type { EntityDataBase } from '@purrception/primitives';

import type { TypeExpressionNode } from '../node';

export type ResolveTypeContext = {
	entity: EntityDataBase;
	params?: TypeExpressionNode[];
	stack: Set<string>;
	resolveImportName: (name: string) => string;
	resolveEntity: (entity: EntityDataBase, type: string) => EntityDataBase | undefined;
	stackHasEntry: (entity: EntityDataBase, type: string) => boolean;
	createChildContext: (
		entity: EntityDataBase,
		type: string,
		params?: TypeExpressionNode[],
	) => ResolveTypeContext;
};
