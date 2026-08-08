import {
	type ComponentDeclaration,
	type FunctionDeclaration,
	isFunctionTypeNode,
	isTypeRefNode,
} from '@purrception/lang-ts';

import { extractComponentProps } from './extractComponentProps';
import { isComponentType } from './isComponentType';
import { isJSXReturnType } from './isJSXReturnType';
import { isParentComponentType } from './isParentComponentType';

/**
 * Converts a function declaration into a component declaration when the
 * function satisfies component detection heuristics.
 *
 * A function is considered a component when:
 *
 * - it returns JSX
 * - it is typed as Component<T>
 * - it is typed as ParentComponent<T>
 *
 * Extracts the props and returns alongside the original function as `funcNode`
 * {@link ComponentNode}.
 */
export function extractComponentFromFunctionDeclaration(
	declaration: FunctionDeclaration,
): ComponentDeclaration | undefined {
	const isComponent = isTypeRefNode(declaration.node) && isComponentType(declaration.node);
	const isParentComponent =
		isTypeRefNode(declaration.node) && isParentComponentType(declaration.node);
	const returnsJSX =
		isFunctionTypeNode(declaration.node) && isJSXReturnType(declaration.node.returns);

	if (!returnsJSX && !isComponent && !isParentComponent) {
		return undefined;
	}

	const props = extractComponentProps(declaration, isParentComponent);

	return {
		...declaration,
		kind: 'component',
		node: {
			kind: 'component',
			funcNode: declaration.node,
			props,
		},
	};
}
