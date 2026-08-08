import type { FunctionJsDocData, FunctionLikeDeclaration } from '@purrception/lang-ts';
import ts from 'typescript';

import {
	extractDescription,
	extractParamTags,
	extractReturnsTag,
	extractTags,
	extractTemplateTags,
} from './private';
export function extractFunctionJsDoc(node: FunctionLikeDeclaration): FunctionJsDocData {
	const jsDoc = ts.getJSDocCommentsAndTags(node as ts.Node).find(ts.isJSDoc) as
		| ts.JSDoc
		| undefined;

	const description = extractDescription(jsDoc);
	const templateTags = extractTemplateTags(jsDoc);
	const paramTags = extractParamTags(jsDoc);
	const returnsTag = extractReturnsTag(jsDoc);
	const tags = extractTags(jsDoc);

	return {
		description,
		templateTags,
		paramTags,
		returnsTag,
		tags,
	};
}
