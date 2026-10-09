import type { EntityDataBasePartial } from '../../types.js';

export function createEntityPartial<T extends string = string>(
	type: T,
	name: string,
	packgeName: string,
): EntityDataBasePartial<T> {
	return { type, name, package: packgeName };
}
