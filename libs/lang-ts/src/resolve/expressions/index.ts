// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './kinds';
export * from './normalize';
export * from './operators';
export * from './resolveExpression';
