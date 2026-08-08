import type {
	ComponentDeclaration,
	Declaration,
	FunctionDeclaration,
	FunctionLikeDeclaration,
	JsDocData,
	TypeDeclaration,
} from '@purrception/lang-ts';
import { type ImportedSymbol } from '@purrception/primitives';
import ts from 'typescript';

export type ProgramFilesContext = {
	path: string;
	readFile: (filename: string) => Promise<string>;
};

export type ProgramFileAPI = {
	path: string;
	filename: string;
	filepath: string;
	sourceFile: ts.SourceFile;
	checker: ts.TypeChecker;
	docs: () => JsDocData | undefined;
	types: () => (ts.TypeAliasDeclaration | ts.InterfaceDeclaration)[];
	functions: () => FunctionLikeDeclaration[];
	exportsMap: () => Map<ts.Node, string>;
	importsMap: () => Map<string, ImportedSymbol>;
};

export type ProgramAPI = {
	files: Record<string, ProgramFileAPI>;
	extractDocs: (file: string) => JsDocData | undefined;
	extractComponents: (files?: string | string[]) => ComponentDeclaration[];
	extractFunctions: (files?: string | string[]) => FunctionDeclaration[];
	extractTypes: (files?: string | string[]) => TypeDeclaration[];
	extractImportedSymbols: (files?: string | string[]) => Record<string, ImportedSymbol>;
	indexDeclaredSymbols: (...args: Declaration[][]) => Record<string, Declaration>;
};
