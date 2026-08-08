import type { JsDocTags } from '../types';

export function getFirstTagValue(tags?: JsDocTags, tagName?: string): string | undefined {
	const tag = tags?.[tagName || ''];
	if (tag) {
		return typeof tag === 'string' ? tag : tag[0];
	}
}
