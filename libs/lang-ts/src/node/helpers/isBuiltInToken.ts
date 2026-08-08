import { BUILTIN_GLOBALS, BUILTIN_TYPES } from '../constants';

export function isBuiltInToken(value: string): boolean {
	return BUILTIN_TYPES.has(value) || BUILTIN_GLOBALS.has(value);
}
