// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isComponentDeclaration';
export * from './isFunctionDeclaration';
export * from './isInterfaceDeclaration';
export * from './isTypeDeclaration';
