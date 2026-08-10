# purrception-lang-ts-fix-resolve-_source-misassigned

## Scope

- `$SCOPE = purrception-lang-ts`

## Question

Is it currently doing nothing on the entry point?

## Refined

- `_source: member._source || node._source || exp._source,`

## Unrefined

- Where is source being created? can we add a type and a factory function?

## Answer

- `return { ...dec, node: { ...dec.node, _source: dec.node._source || resolution } };`

## How to test

- In props table with `show groups` turned ON

