// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractFunctionJsDoc';
export * from './extractNodeJsDoc';
export * from './getFileJsDoc';
export * from './hasJsDocIgnore';
