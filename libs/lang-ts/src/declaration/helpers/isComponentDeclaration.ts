import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants.js';
import type { ComponentDeclaration } from '../types.js';

export function isComponentDeclaration(dec?: DeclaredSymbol): dec is ComponentDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'component'
	);
}
