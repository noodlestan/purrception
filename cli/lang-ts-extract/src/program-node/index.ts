// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractFunctionFromDeclaration.js';
export * from './extractTypeFromDeclaration.js';
export * from './helpers/index.js';
