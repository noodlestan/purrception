import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants';
import type { FunctionDeclaration } from '../types';

export function isFunctionDeclaration(dec?: DeclaredSymbol): dec is FunctionDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'function'
	);
}
