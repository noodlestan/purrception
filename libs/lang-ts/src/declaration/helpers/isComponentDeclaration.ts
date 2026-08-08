import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants';
import type { ComponentDeclaration } from '../types';

export function isComponentDeclaration(dec?: DeclaredSymbol): dec is ComponentDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'component'
	);
}
