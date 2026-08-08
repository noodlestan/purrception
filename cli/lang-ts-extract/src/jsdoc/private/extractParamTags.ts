import ts from 'typescript';

export function extractParamTags(jsDoc: ts.JSDoc | undefined): Record<string, string> {
	const paramTags: Record<string, string> = {};
	if (!jsDoc?.tags) {
		return paramTags;
	}

	for (const tag of jsDoc.tags) {
		if (ts.isJSDocParameterTag(tag)) {
			const name = tag.name.getText();
			const comment = typeof tag.comment === 'string' ? tag.comment : '';
			paramTags[name] = comment;
		}
	}

	return paramTags;
}
