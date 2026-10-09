import type { JsDocData } from '../../jsdoc/index.js';

export function hasTag(data: JsDocData, tag: string): boolean {
	return data.tags?.[tag] !== undefined;
}
