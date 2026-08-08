import type { FunctionTypeReturns } from '@purrception/lang-ts';

export function isJSXReturnType(returns: FunctionTypeReturns | undefined): boolean {
	if (!returns || (returns.type.kind === 'primitive' && returns.type.primitive === 'void')) {
		return false;
	}

	return returns.type.kind === 'ref' && returns.type.ref === 'JSX.Element';
}
