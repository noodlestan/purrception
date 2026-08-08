import {
	type FunctionDeclaration,
	type FunctionLikeDeclaration,
	PurrceptionLanguageId,
} from '@purrception/lang-ts';
import ts from 'typescript';

import { extractFunctionJsDoc, hasJsDocIgnore } from '../jsdoc';
import type { ProgramFileAPI } from '../program';

import {
	extractExportedName,
	extractFunctionParams,
	extractFunctionReturns,
	extractNodeGenerics,
	extractVariableFunctionType,
	isExportedDeclaration,
} from './helpers';

/**
 * Resolves the implementation declaration associated with a function-like node.
 *
 * Function declarations return themselves.
 *
 * Variable statements return the first variable declaration whose initializer
 * is a function expression or arrow function.
 *
 * Examples:
 *
 * function foo() {}
 *
 * const foo = () => {}
 *
 * const foo = function () {}
 */
function getVariableFunctionDeclaration(
	statement: FunctionLikeDeclaration,
): [ts.FunctionDeclaration] | [ts.VariableDeclaration, ts.ArrowFunction | ts.FunctionExpression] {
	if (ts.isFunctionDeclaration(statement)) {
		return [statement];
	}
	let init;
	const declaration = statement.declarationList.declarations.find(d => {
		init = d.initializer;
		return init && d.name && (ts.isArrowFunction(init) || ts.isFunctionExpression(init));
	});

	if (!declaration || !init) {
		throw new Error(
			'Expected VariableStatement containing an arrow function or function expression.',
		);
	}

	return [declaration, init as ts.ArrowFunction | ts.FunctionExpression];
}
/**
 * Extracts a single function declaration from a TypeScript AST node.
 *
 * The resulting declaration preserves the public exported name and captures:
 *
 * - JSDoc metadata
 * - generic parameters
 * - function parameters
 * - return types
 * - explicit function type declarations
 *
 * Function declarations are represented as a synthesized
 * {@link FunctionTypeNode}.
 *
 * Variable declarations with explicit types preserve the declared type
 * expression instead of synthesizing a function signature.
 *
 * Examples:
 *
 * function foo(props: Props): JSX.Element {}
 *
 * const foo = (props: Props): JSX.Element => {}
 *
 * const foo: Component<Props> = props => {}
 *
 * const foo: ParentComponent<Props> = props => {}
 */
export function extractFunctionFromDeclaration(
	programFile: ProgramFileAPI,
	declaration: FunctionLikeDeclaration,
): FunctionDeclaration | undefined {
	if (hasJsDocIgnore(declaration)) {
		return undefined;
	}
	const jsDoc = extractFunctionJsDoc(declaration);

	const { description, templateTags, tags, paramTags, returnsTag } = jsDoc;

	const [decl, init] = getVariableFunctionDeclaration(declaration);

	const signatureNode = ts.isVariableDeclaration(decl)
		? (init as ts.ArrowFunction | ts.FunctionExpression)
		: (decl as ts.FunctionDeclaration);
	const type = ts.isVariableDeclaration(decl) ? extractVariableFunctionType(decl) : undefined;

	const map = programFile.exportsMap();
	const name = extractExportedName(decl, map);

	const generic = extractNodeGenerics(signatureNode);
	const params = extractFunctionParams(signatureNode.parameters, jsDoc);
	const returns = extractFunctionReturns(signatureNode.type, jsDoc);

	const node = type ?? {
		kind: 'function',
		generic,
		params,
		returns,
		description,
		templateTags,
		tags,
		// WIP These need to merged into params and returns structures? at extact time?
		paramTags,
		returnsTag,
	};

	return {
		at: programFile.filepath,
		name,
		lang: PurrceptionLanguageId,
		kind: 'function',
		private: !isExportedDeclaration(programFile, signatureNode),
		node,
	};
}
