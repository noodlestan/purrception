export const BUILTIN_TYPES = new Set([
	'string',
	'number',
	'boolean',
	'unknown',
	'any',
	'never',
	'void',
	'null',
	'undefined',
	'symbol',
	'bigint',
]);

export const BUILTIN_GLOBALS = new Set([
	'Record',
	'NonNullable',
	'Partial',
	'Required',
	'Readonly',
	'Array',
	'Promise',
	'Map',
	'Set',
	'Date',
]);
