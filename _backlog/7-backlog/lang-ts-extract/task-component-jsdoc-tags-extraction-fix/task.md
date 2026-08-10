---
source: .agents/skills/write-task/SKILL.md
references:
    - .agents/domains/tasks/index.md
    - .agents/domains/knowledge/index.md
skills:
    - write-task
---

# Fix JsDoc tags not collected on component function

## Summary

Component JsDoc tags and description are not visible on component pages. The extractor is not stamping tags of component declarations into `componentdeclaration.node`.

## Links

- Test URL: http://localhost:3000/api/@no-comply/solid-composables/content/component/VisuallyHidden

## Refined

### Scope

Fix the extractor to collect JsDoc tags and description for component functions, similar to how it works for regular functions.

**Bonus item:**

- Check if docs (description and tags) are also stamped on interface declarations (sibling mechanism, not currently tested)

### Directions

**Probable Root Cause:** extractor not stamping tags of component declaration into `componentdeclaration.node`
**Likely fix**: check how function declaration are extracted, it works for functions and types, apply similar logic to component declarations

### Outcomes

- Component JsDoc tags and description are visible on component pages
- Tags appear before/after the code block of "Function section"

### Constraints

- Must maintain existing functionality for regular functions
- Must work with the existing extractor architecture

### Not in scope

- Changes to the UI rendering (only extraction)
- Support for interface JsDoc tags (not tested)

## Acceptance criteria

- [ ] Component JsDoc tags are extracted

**For human verification:**

- [ ] Tags appear before/after the code block of "Function section"

## Notes

### Follow ups
