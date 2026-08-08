import type { FunctionLikeDeclaration } from '@purrception/lang-ts';
import ts from 'typescript';

export function hasJsDocIgnore(node: FunctionLikeDeclaration): boolean {
	const tags = ts.getJSDocTags(node);
	return tags.some(tag => tag.tagName.escapedText === 'ignore');
}
