import ts from 'typescript';

export function extractDescription(jsDoc: ts.JSDoc | undefined): string | undefined {
	if (!jsDoc?.comment) {
		return;
	}

	if (Array.isArray(jsDoc.comment)) {
		return (jsDoc.comment as ts.NodeArray<ts.JSDocComment>)
			.map(part => {
				return ts.isJSDocLink(part) ? part.getFullText() : part.text;
			})
			.join('');
	}
	return jsDoc.comment as string;
}
