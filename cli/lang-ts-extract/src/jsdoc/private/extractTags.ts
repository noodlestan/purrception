import ts from 'typescript';

const FILTER = (tag: ts.JSDocTag) => {
	return !ts.isJSDocParameterTag(tag) && !ts.isJSDocReturnTag(tag) && !ts.isJSDocTemplateTag(tag);
};

export function extractTags(
	jsDoc: ts.JSDoc | undefined,
	predicate?: (tag: ts.JSDocTag) => boolean,
): Record<string, string | string[]> | undefined {
	if (!jsDoc?.tags) {
		return undefined;
	}

	const tags: Record<string, string | string[]> = {};
	for (const tag of jsDoc.tags) {
		if (!FILTER(tag) || (predicate && !predicate(tag))) {
			continue;
		}

		const name = tag.tagName.getText();
		const comment = typeof tag.comment === 'string' ? tag.comment : '';

		if (name in tags) {
			const existing = tags[name];
			if (Array.isArray(existing)) {
				existing.push(comment);
			} else {
				tags[name] = [existing, comment];
			}
		} else {
			tags[name] = comment;
		}
	}

	if (Object.keys(tags).length === 0) {
		return undefined;
	}

	return tags;
}
