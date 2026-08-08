import type { DeclaredSymbol } from '@purrception/primitives';

import { PurrceptionLanguageId } from '../../constants';
import type { InterfaceDeclaration } from '../types';

export function isInterfaceDeclaration(dec?: DeclaredSymbol): dec is InterfaceDeclaration {
	return (
		typeof dec !== 'undefined' &&
		dec.lang === PurrceptionLanguageId &&
		'kind' in dec &&
		dec.kind === 'interface'
	);
}
