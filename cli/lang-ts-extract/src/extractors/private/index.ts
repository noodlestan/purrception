// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractComponentFromFunctionDeclaration';
export * from './extractComponentProps';
export * from './isComponentType';
export * from './isJSXReturnType';
export * from './isParentComponentType';
