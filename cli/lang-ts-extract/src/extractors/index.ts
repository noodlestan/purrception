// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractComponentsFromProgram';
export * from './extractFunctionsFromProgram';
export * from './extractImportsFromProgram';
export * from './extractTypesFromProgram';
