import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants.js';
import type { FunctionDeclaration } from '../types.js';

export function isFunctionDeclaration(dec?: DeclaredSymbol): dec is FunctionDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'function'
	);
}
