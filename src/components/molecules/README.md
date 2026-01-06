# Molecules

In atomic design, molecules are simple combinations of atoms that form small, functional components with a single purpose.

## What belongs here?

- **FormGroup**: Label + Input + Error message
- **MenuItem**: Icon + Text for navigation items
- **Card**: Simple card with header and content
- **Notification**: Alert or notification component
- **SearchBar**: Input + Button
- **Tooltip**: Text with positioning
- **Tabs**: Tab navigation component
- **Accordion**: Expandable/collapsible component
- **ToggleSwitch**: On/Off toggle component

## Guidelines

1. **Composed of Atoms**: Molecules should primarily combine atoms
2. **Single Purpose**: Should serve one clear purpose
3. **Reusable**: Should be reusable across different contexts
4. **Clear API**: Should have well-defined props
5. **Self-Contained**: Should not depend on external state

## Structure

Each molecule should follow this structure:

```
FormGroup/
├── FormGroup.tsx    # Component implementation
├── index.ts        # Export file
└── [optional files] # Tests, styles, etc.
```

## Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { FormGroup } from './FormGroup';
```
