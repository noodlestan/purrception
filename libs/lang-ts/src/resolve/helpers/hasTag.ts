import type { JsDocData } from '../../jsdoc';

export function hasTag(data: JsDocData, tag: string): boolean {
	return data.tags?.[tag] !== undefined;
}
