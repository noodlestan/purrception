// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isComponentDeclaration.js';
export * from './isFunctionDeclaration.js';
export * from './isInterfaceDeclaration.js';
export * from './isTypeDeclaration.js';
