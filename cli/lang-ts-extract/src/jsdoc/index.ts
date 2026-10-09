// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractFunctionJsDoc.js';
export * from './extractNodeJsDoc.js';
export * from './getFileJsDoc.js';
export * from './hasJsDocIgnore.js';
