import type { JsDocData } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractDescription, extractTags, extractTemplateTags } from './private';
export function extractNodeJsDoc(node: ts.Node): JsDocData {
	const jsDoc = ts.isJSDoc(node)
		? node
		: (ts.getJSDocCommentsAndTags(node).find(ts.isJSDoc) as ts.JSDoc | undefined);

	const description = extractDescription(jsDoc);
	const templateTags = extractTemplateTags(jsDoc);
	const tags = extractTags(jsDoc);

	return { description, tags, templateTags };
}
