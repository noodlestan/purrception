import type { Declaration } from '@purrception/lang-ts';
import type { ImportedSymbol } from '@purrception/primitives';

import {
	extractComponentsFromProgram,
	extractFunctionsFromProgram,
	extractImportsFromProgram,
	extractTypesFromProgram,
} from '../extractors';

import { createProgramFile } from './createProgramFile';
import type { ProgramAPI, ProgramFileAPI, ProgramFilesContext } from './types';

export async function createProgram(
	ctx: ProgramFilesContext,
	files: Record<string, string | string[]>,
): Promise<ProgramAPI> {
	const programMap: Record<string, ProgramFileAPI> = {};

	for (const key in files) {
		const file = files[key];
		if (!file) {
			continue;
		}
		if (typeof file === 'string') {
			programMap[file] = await createProgramFile(ctx, file);
		} else {
			for (const name of file) {
				programMap[name] = await createProgramFile(ctx, name);
			}
		}
	}

	const getPrograms = (files: string | string[]) => {
		const fileArray = typeof files === 'string' ? [files] : files;
		return fileArray.map(file => programMap[file]);
	};

	const extractDocs = (file: string) => {
		const program = programMap[file];
		if (!program) {
			return undefined;
		}
		return program.docs();
	};

	function extractComponents(files?: string | string[]) {
		const includeFiles = arguments.length ? files : Object.keys(programMap);
		if (includeFiles === undefined) {
			throw new Error(`extractComponents() called with indefined at ${ctx.path}`);
		}
		const programs = getPrograms(includeFiles);
		const nested = programs.map(p => extractComponentsFromProgram(p));
		return nested.flat();
	}

	function extractFunctions(files?: string | string[]) {
		const includeFiles = arguments.length ? files : Object.keys(programMap);
		if (includeFiles === undefined) {
			throw new Error(`extractFunctions() called with indefined at ${ctx.path}`);
		}

		const programs = getPrograms(includeFiles);
		const nested = programs.map(p => extractFunctionsFromProgram(p));
		return nested.flat();
	}

	function extractTypes(files?: string | string[]) {
		const includeFiles = arguments.length ? files : Object.keys(programMap);
		if (includeFiles === undefined) {
			throw new Error(`extractTypes() called with indefined at ${ctx.path}`);
		}

		const programs = getPrograms(includeFiles);
		const nested = programs.map(p => extractTypesFromProgram(p));
		return nested.flat();
	}

	function extractImportMap(files?: string | string[]) {
		const includeFiles = arguments.length ? files : Object.keys(programMap);
		if (includeFiles === undefined) {
			throw new Error(`extractImportMap() called with indefined at ${ctx.path}`);
		}

		const programs = getPrograms(includeFiles);
		const maps = programs.map(p => extractImportsFromProgram(p));

		const mergedMap = new Map<string, ImportedSymbol>();
		for (const map of maps) {
			for (const [key, value] of map.entries()) {
				const existing = mergedMap.get(key);
				if (existing) {
					if (existing.from === value.from && existing.name === value.name) {
						continue;
					}
					console.error('Existing entry:', existing);
					console.error('Duplicate entry:', value);
					throw new Error(`Duplicate key: ${key}`);
				}
				mergedMap.set(key, value);
			}
		}

		return mergedMap;
	}

	const isLocalImport = (dep: ImportedSymbol) => {
		return dep.from.endsWith(ctx.path) || dep.from.includes(ctx.path + '/');
	};

	function extractImportedSymbols(files?: string | string[]) {
		const includeFiles = arguments.length ? files : Object.keys(programMap);
		if (includeFiles === undefined) {
			throw new Error(`extractImportMap() called with indefined at ${ctx.path}`);
		}
		const map = extractImportMap(includeFiles);
		const entries = Array.from(map.entries()).filter(([, value]) => !isLocalImport(value));
		return Object.fromEntries(entries);
	}

	const indexDeclaredSymbols = (...args: Declaration[][]): Record<string, Declaration> => {
		const entries = args.flat().map(symbol => [symbol?.name, symbol]);
		return Object.fromEntries(entries);
	};

	return {
		files: programMap,
		extractDocs,
		extractComponents,
		extractFunctions,
		extractTypes,
		extractImportedSymbols,
		indexDeclaredSymbols,
	};
}
