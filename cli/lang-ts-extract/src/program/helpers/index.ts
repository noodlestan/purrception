// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './getExportMap';
export * from './getImportMap';
export * from './getProgramFunctions';
export * from './getProgramTypes';
