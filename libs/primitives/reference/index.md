# @purrception/lang-ts-extract

## Contracts

- `TypeExpressionNode`
- `FunctionDeclaration`
- `ComponentDeclaration`
- `TypeExpressionDeclaration`

## Extractors

- `extractFunctionsFromFile`
- `extractTypesFromFile`
- `extractComponentsFromFile`

## JSDoc

- `extractNodeJsDoc`
- `extractFunctionJsDoc`
- `hasJsDocIgnore`

## Helpers

- Inference utilities like `isComponentType`, `isJSXReturnType`, etc.
- Deep AST analysis tools (`extractMappedTypeNode`, `extractFunctionReturns`, etc.)

## @no-comply/meta

Userland package for defining SolidJS-aware entity models and extractors based on project conventions.

## Entities

- `Component`
- `Context`
- `Controller`
- `Mixin`
- `Module`
- `Provider`
- `Service`

### Helpers

- `findComponentFile`
- `findFactoryFile`
- `findProviderFile`
- `findTypesFile`
- `findHelperFiles`
- `findHookFiles`
