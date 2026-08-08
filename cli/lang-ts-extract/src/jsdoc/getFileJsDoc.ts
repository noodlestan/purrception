import type { JsDocData } from '@purrception/lang-ts';
import ts from 'typescript';

import { extractNodeJsDoc } from './extractNodeJsDoc';
import { getFirstJsDocNode } from './private';

export function getFileJsDoc(sourceFile: ts.SourceFile): JsDocData | undefined {
	const jsDoc = getFirstJsDocNode(sourceFile);

	if (!jsDoc) {
		return undefined;
	}

	return extractNodeJsDoc(jsDoc);
}
