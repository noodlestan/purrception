// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractors/index.js';
export * from './jsdoc/index.js';
export * from './program-node/index.js';
export * from './program/index.js';
