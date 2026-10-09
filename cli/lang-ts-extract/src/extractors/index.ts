// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractComponentsFromProgram.js';
export * from './extractFunctionsFromProgram.js';
export * from './extractImportsFromProgram.js';
export * from './extractTypesFromProgram.js';
