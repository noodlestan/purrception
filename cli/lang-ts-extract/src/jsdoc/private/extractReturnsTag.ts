import ts from 'typescript';

export function extractReturnsTag(jsDoc: ts.JSDoc | undefined): string | undefined {
	if (!jsDoc?.tags) {
		return undefined;
	}

	for (const tag of jsDoc.tags) {
		if (ts.isJSDocReturnTag(tag)) {
			return typeof tag.comment === 'string' ? tag.comment : '';
		}
	}

	return undefined;
}
