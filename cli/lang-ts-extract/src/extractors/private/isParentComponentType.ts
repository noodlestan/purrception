import type { TypeRefNode } from '@purrception/lang-ts';

export function isParentComponentType(type: TypeRefNode | undefined): boolean {
	return Boolean(type?.ref === 'ParentComponent' && type?.member === undefined);
}
