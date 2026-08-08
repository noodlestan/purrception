import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants';
import type { TypeDeclaration } from '../types';

export function isTypeDeclaration(dec?: DeclaredSymbol): dec is TypeDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'type'
	);
}
