// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractComponentFromFunctionDeclaration.js';
export * from './extractComponentProps.js';
export * from './isComponentType.js';
export * from './isJSXReturnType.js';
export * from './isParentComponentType.js';
