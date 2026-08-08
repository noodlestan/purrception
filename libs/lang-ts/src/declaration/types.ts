import type { LanguageDeclaredSymbol } from '@purrception/primitives';
import type ts from 'typescript';

import type { JsDocData } from '../jsdoc';
import type {
	ComponentNode,
	FunctionTypeNode,
	ObjectLiteralTypeMember,
	TypeExpressionGeneric,
	TypeExpressionNode,
} from '../node';

export type FunctionLikeDeclaration = ts.FunctionDeclaration | ts.VariableStatement;

export type DeclarationKind = 'type' | 'interface' | 'function' | 'component';

export type DeclarationBranded = LanguageDeclaredSymbol<'@purrception/lang-ts'>;

export type DeclarationBase<K extends DeclarationKind> = DeclarationBranded & {
	kind: K;
	private?: boolean;
};

export type TypeExpressionDeclaration<K extends TypeExpressionNode = TypeExpressionNode> =
	DeclarationBase<'type'> & {
		node: K;
	};

export type InterfaceTypeNode = JsDocData & {
	generic?: TypeExpressionGeneric[];
	heritage?: TypeExpressionNode[];
	members: Record<string, ObjectLiteralTypeMember>;
};

export type InterfaceDeclaration = DeclarationBase<'interface'> & {
	node: InterfaceTypeNode;
};

export type FunctionDeclaration = DeclarationBase<'function'> & {
	node: FunctionTypeNode | TypeExpressionNode;
};

export type ComponentDeclaration = DeclarationBase<'component'> & {
	node: ComponentNode;
};

export type Declaration =
	| TypeExpressionDeclaration
	| InterfaceDeclaration
	| FunctionDeclaration
	| ComponentDeclaration;

export type TypeDeclaration = TypeExpressionDeclaration | InterfaceDeclaration;

export type DeclaredSymbolTypes = Declaration;
