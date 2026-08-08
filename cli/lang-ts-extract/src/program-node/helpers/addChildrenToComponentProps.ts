import {
	type ObjectLiteralTypeNode,
	type TypeExpressionNode,
	createTypeRefNode,
} from '@purrception/lang-ts';

/**
 * Augments component props with a required `children` property when the
 * component is classified as a ParentComponent.
 *
 * Examples:
 *
 * ParentComponent
 *   => { children: JSX.Element }
 *
 * ParentComponent<Props>
 *   => Props & { children: JSX.Element }
 */
export function addChildrenToComponentProps(
	props: TypeExpressionNode | undefined,
	isParentComponent: boolean,
): TypeExpressionNode | undefined {
	const childrenProps: ObjectLiteralTypeNode = {
		kind: 'object',
		members: {
			children: {
				type: createTypeRefNode('JSX.Element'),
				optional: false,
			},
		},
	};

	if (!props) {
		return childrenProps;
	}

	if (!isParentComponent) {
		return props;
	}

	return {
		kind: 'intersection',
		entries: [props, childrenProps],
	};
}
