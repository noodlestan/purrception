import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants.js';
import type { TypeDeclaration } from '../types.js';

export function isTypeDeclaration(dec?: DeclaredSymbol): dec is TypeDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'type'
	);
}
