# CHANGELOG

## (PENDING RELEASE)

### Refactored

- **Declarations:** Align `InterfaceDeclaration` with others by moving `heritage` and others to a `node` member of type `InterfaceTypeNode`.

### Added

- **Resolve:** Add `hasTag()` helper for `@noresolve` filtering.
- **Resolve:** Check whether to `@noresolve` when resolving members of interfaces, objects, intersections, omits, and picks.
