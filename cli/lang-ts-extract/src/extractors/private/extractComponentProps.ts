import {
	type FunctionDeclaration,
	type TypeExpressionNode,
	isFunctionTypeNode,
	isTypeRefNode,
} from '@purrception/lang-ts';

import { addChildrenToComponentProps } from '../../program-node/helpers/addChildrenToComponentProps';

/**
 * Extracts component props from a normalized function declaration.
 *
 * Function-based components derive props from the first function parameter.
 *
 * Examples:
 *
 * function Button(props: Props) {}
 *
 * function Button(props: { foo: boolean }) {}
 *
 * const Button = (props: Props) => {}
 *
 * Explicit component types derive props from the first generic argument.
 *
 * Examples:
 *
 * const Button: Component<Props>
 *
 * const Button: Component<{ foo: boolean }>
 *
 * const Button: ParentComponent<Props>
 *
 * Parent components automatically receive a synthetic `children` property.
 */
export function extractComponentProps(
	declaration: FunctionDeclaration,
	isParentComponent: boolean,
): TypeExpressionNode | undefined {
	if (isTypeRefNode(declaration.node)) {
		const propsType = declaration.node.params?.[0];
		return addChildrenToComponentProps(propsType, isParentComponent);
	}

	if (isFunctionTypeNode(declaration.node)) {
		return declaration.node.params?.[0].type;
	}

	return undefined;
}
