import type { FunctionLikeDeclaration } from '@purrception/lang-ts';
import ts from 'typescript';

export function getProgramFunctions(sourceFile: ts.SourceFile): FunctionLikeDeclaration[] {
	const out: ts.Node[] = [];

	function visit(node: ts.Node) {
		if (ts.isFunctionDeclaration(node)) {
			out.push(node);
		} else if (ts.isVariableStatement(node)) {
			for (const decl of node.declarationList.declarations) {
				const init = decl.initializer;

				if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
					out.push(node);
				}
			}
		} else {
			ts.forEachChild(node, visit);
		}
	}

	visit(sourceFile);
	return out as FunctionLikeDeclaration[];
}
