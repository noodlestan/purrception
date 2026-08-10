# Add `@noresolve` Annotation Support — Archive Summary

## Initial Plan

Support `/** @noresolve */` JSDoc annotations that opt type declarations and object literal type members out of inline resolution during type resolution. Keep refs as-is instead of inlining the target declaration's node.

## Implementation Summary

### Created

- **helpers/hasTag** — shared helper; checks if a `JsDocData` object has a given tag
- **scoring + search engine** — verbatim-first search with greedy fallback over a pre-built entity index

### Refactored Types

- **InterfaceDeclaration** — no longer an inline shape with members at root; gains a `node: InterfaceTypeNode` property, mirroring `FunctionDeclaration`
- **InterfaceTypeNode** — new type grouping generic, heritage, members plus JsDocData
- **DeclarationBase** — strips `JsDocData` from the base (no longer extends it)
- **DeclaredSymbol** — strips `DocsData` (no longer extends it)
- **DeclaredSymbolTypes** — new alias union over Declaration

### Refactored Pipelines

- **Extraction** (`extractInterfaceDeclaration`, `extractFunctionFromDeclaration`, `extractTypeFromDeclaration`) — JsDoc fields (description, tags, templateTags) moved from the declaration root into the `.node` object
- **Resolution** (`resolveTypeRefNode`, `resolveObject`, `resolveInterfaceDeclaration`) — reads `.node` for JsDoc; `@noresolve` guard returns the original ref or member instead of inlining
- **Layout** (`layoutInterfaceDeclaration`, `layoutTypeDeclaration`) — reads from `declaration.node`
- **Meta** (`resolveComponentPropsJsDocData`) — accesses `component.node.tags`
- **UI** (`APIComponentSection`, `APIFactorySection`, `APITypesSection`) — passes `.node` to `CodeDocDescription`

### Scored Search Engine

- **SearchEntityRecord**, **SearchSymbolRecord** — pre-built index types
- **SearchEntityResult**, **SearchSymbolResult** — result types with `score`
- **buildSearchEntityRecords** — index builder from entity array
- **searchEntityRecords** — main search loop with LIMIT and sorting
- **searchSymbolRecord** — per-symbol matching and scoring
- **calcSearchEntityResultScore**, **calcSearchSymbolResultScore** — verbatim-first scoring with greedy fallback
- **scoring constants** — `SEARCH_MATCH_SCORE_ENTITY|SYMBOL_NAME|DESCRIPTION_VERBATIM|GREEDY`
- **searchEntities** — public API method on `NoComplyMetaAPI`
- **ApiIndexPage** — consumes `searchEntities`, renders scored search results

### Consumer Package Changes

- **solid-composables** — removed `@noresolve` workaround annotations from `LayoutPaddingProps` (7 padding props) and `LayoutMixinProps` (overflow)
- **solid-primitives** — added `@noresolve` annotation to `ClassList`
- **standard-ui** — added `@noresolve` annotations to `ToggleButtonProps` labels and icons

## Main Outcomes

- Declarations with `@noresolve` are rendered as refs instead of inlined nodes
- Interface declarations are normalized to the same shape as function declarations (JsDoc on `.node`)
- A searchable entity index with scored, verbatim-first search is available via `NoComplyMetaAPI`
- Existing `@noresolve` usage in consumer packages takes effect: padding props, overflow, ClassList, and ToggleButton labels/icons remain as refs
