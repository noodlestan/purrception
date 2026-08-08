import type { EntityDataBase } from '@purrception/primitives';

import type { JsDocData, JsDocTags } from '../jsdoc';

export type TypeExpressionKind =
	| 'ref'
	| 'primitive'
	| 'object'
	| 'array'
	| 'tuple'
	| 'intersection'
	| 'union'
	| 'function'
	| 'component'
	| 'pick'
	| 'omit'
	| 'literal'
	| 'template-literal'
	| 'operator'
	| 'mapped'
	| 'conditional'
	| 'infer';

export type TypeResolutionMeta = {
	ref: string;
	entity: EntityDataBase;
};

export type TypeExpressionBase<K extends TypeExpressionKind> = JsDocData & {
	kind: K;
	generic?: TypeExpressionGeneric[];
	_source?: TypeResolutionMeta;
};

export type TypeExpressionGeneric = {
	name: string;
	constraint: TypeRefNode | PrimitiveNode;
	default?: TypeRefNode;
};

export type ObjectLiteralTypeMember = JsDocData & {
	type: TypeExpressionNode;
	optional?: boolean;
	readonly?: boolean;
	_source?: TypeResolutionMeta;
};

export type ObjectIndexSignature = JsDocData & {
	keyName: string;
	keyType: TypeExpressionNode;
	valueType: TypeExpressionNode;
	readonly?: boolean;
	_source?: TypeResolutionMeta;
};

export type ObjectMappedSignature = JsDocData & {
	paramName: string;
	constraint: TypeExpressionNode;
	valueType: TypeExpressionNode;
	optional?: boolean;
	readonly?: boolean;
	_source?: TypeResolutionMeta;
};

export type TypeRefNode = TypeExpressionBase<'ref'> & {
	ref: string;
	member?: string;
	params?: TypeExpressionNode[];
};

export type PrimitiveNode = TypeExpressionBase<'primitive'> & {
	primitive: string;
	member?: string;
	params?: TypeExpressionNode[];
};

export type ObjectLiteralTypeNode = TypeExpressionBase<'object'> & {
	kind: 'object';
	members: Record<string, ObjectLiteralTypeMember>;
	indexSignatures?: ObjectIndexSignature[];
	mappedSignatures?: ObjectMappedSignature[];
};

export type ArrayTypeNode = TypeExpressionBase<'array'> & {
	kind: 'array';
	elements: TypeExpressionNode;
};

export type NamedTupleTypeElement = {
	name: string;
	type: TypeExpressionNode;
	optional?: boolean;
};

export type TupleTypeElement = TypeExpressionNode | NamedTupleTypeElement;

export type TupleTypeNode = TypeExpressionBase<'tuple'> & {
	kind: 'tuple';
	elements: TupleTypeElement[];
};

export type IntersectionTypeNode = TypeExpressionBase<'intersection'> & {
	kind: 'intersection';
	entries: TypeExpressionNode[];
};

export type UnionTypeNode = TypeExpressionBase<'union'> & {
	kind: 'union';
	entries: TypeExpressionNode[];
};

export type FunctionTypeParam = {
	name: string;
	type: TypeExpressionNode;
	optional?: boolean;
	description?: string;
	tags?: JsDocTags;
};

export type FunctionTypeReturns = {
	type: TypeExpressionNode;
	description?: string;
	asserts?: {
		parameter: string;
		type: TypeExpressionNode;
	};
};

export type FunctionTypeNode = TypeExpressionBase<'function'> & {
	kind: 'function';
	params?: FunctionTypeParam[];
	returns?: FunctionTypeReturns;
};

export type ComponentNode = TypeExpressionBase<'component'> & {
	funcNode: FunctionTypeNode | TypeExpressionNode;
	props: TypeExpressionNode | undefined;
};

export type PickTypeNode = TypeExpressionBase<'pick'> & {
	kind: 'pick';
	source: TypeExpressionNode;
	members: UnionTypeNode | TypeRefNode;
};

export type OmitTypeNode = TypeExpressionBase<'omit'> & {
	kind: 'omit';
	source: TypeExpressionNode;
	members: UnionTypeNode | TypeRefNode;
};

export type LiteralTypeNode = TypeExpressionBase<'literal'> & {
	kind: 'literal';
	value: string | number | boolean;
};

export type TemplateLiteralTypeNode = TypeExpressionBase<'template-literal'> & {
	kind: 'template-literal';
	head: string;
	spans: Array<{
		type: TypeExpressionNode;
		text: string;
	}>;
};

export type OperatorTypeNode = TypeExpressionBase<'operator'> & {
	kind: 'operator';
	operator: 'readonly' | 'keyof' | string;
	operand: TypeExpressionNode;
};

export type MappedTypeNode = TypeExpressionBase<'mapped'> & {
	kind: 'mapped';
	param: string;
	constraint: string; // Usually K
	valueType: string; // Usually T[K] or similar
	optional: boolean;
	readonly: boolean;
};

export type ConditionalTypeNode = TypeExpressionBase<'conditional'> & {
	kind: 'conditional';
	checkType: TypeExpressionNode;
	extendsType: TypeExpressionNode;
	trueType: TypeExpressionNode;
	falseType: TypeExpressionNode;
};

export type InferTypeNode = TypeExpressionBase<'infer'> & {
	kind: 'infer';
	name: string;
};

export type TypeExpressionNode =
	| TypeRefNode
	| PrimitiveNode
	| ObjectLiteralTypeNode
	| ArrayTypeNode
	| TupleTypeNode
	| IntersectionTypeNode
	| UnionTypeNode
	| FunctionTypeNode
	| PickTypeNode
	| OmitTypeNode
	| LiteralTypeNode
	| TemplateLiteralTypeNode
	| MappedTypeNode
	| OperatorTypeNode
	| ConditionalTypeNode
	| InferTypeNode;
