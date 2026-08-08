import ts from 'typescript';

export function extractTemplateTags(
	jsDoc: ts.JSDoc | undefined,
): Record<string, string> | undefined {
	if (!jsDoc?.tags) {
		return undefined;
	}

	const templateTags: Record<string, string> = {};

	for (const tag of jsDoc.tags) {
		if (ts.isJSDocTemplateTag(tag)) {
			for (const typeParam of tag.typeParameters) {
				const name = typeParam.name.getText();
				const comment = typeof tag.comment === 'string' ? tag.comment : '';
				templateTags[name] = comment;
			}
		}
	}

	if (Object.keys(templateTags).length === 0) {
		return undefined;
	}

	return templateTags;
}
