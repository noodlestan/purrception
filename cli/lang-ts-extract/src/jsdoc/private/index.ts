// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractDescription.js';
export * from './extractParamTags.js';
export * from './extractReturnsTag.js';
export * from './extractTags.js';
export * from './extractTemplateTags.js';
export * from './getFirstJsDocNode.js';
