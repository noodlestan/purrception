import type { TypeRefNode } from '@purrception/lang-ts';

export function isComponentType(type: TypeRefNode | undefined): boolean {
	return Boolean(type?.ref === 'Component' && type?.member === undefined);
}
