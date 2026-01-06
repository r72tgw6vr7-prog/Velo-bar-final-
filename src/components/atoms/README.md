# Atoms

In atomic design, atoms are the basic building blocks of the interface. They are the smallest components that cannot be broken down further while still maintaining their functionality.

## What belongs here?

- **Button**: Button components with multiple variants and states
- **Card**: Base card components with slot-based architecture
- **Icon**: Icon components
- **Input**: Form input elements with validation and icons
- **Section**: Layout components for page sections
- **Typography**: Text elements like headings, paragraphs
- **Label**: Form labels
- **Checkbox**: Checkboxes and radio buttons
- **Badge**: Simple badge components
- **Avatar**: User avatars
- **Divider**: Line separators

## Consolidated Components

As part of our component consolidation initiative, several atoms have been standardized and consolidated:

### Button (v2)

`/Button/v2/Button.tsx`
Consolidated button component with extensive features for different variants, sizes, states, and icon positioning.

### Card

`/Card/Card.tsx`
Slot-based card component with Header, Body, and Footer components for structured content.

### Input

`/Input/ConsolidatedInput.tsx`
Comprehensive input component with validation, icons, and accessibility features.

### Section

`/Section/Section.tsx`
Layout component for page sections with spacing, container, and background options.

## Guidelines

1. **Single Responsibility**: Each atom should do one thing and do it well
2. **No Dependencies**: Atoms should not depend on other component types
3. **Highly Reusable**: Atoms should be designed for maximum reuse
4. **Stateless When Possible**: Prefer stateless/controlled components
5. **Accepts Props**: Should accept and forward appropriate props
6. **Design Token Usage**: Use design tokens for colors, spacing, typography
7. **Documentation**: Include README.md with usage examples
8. **Accessibility**: Follow WCAG AA guidelines and include proper ARIA attributes

## Structure

Each atom should follow this structure:

```
ComponentName/
├── ComponentName.tsx     # Component implementation
├── index.ts             # Export file
├── README.md            # Documentation and examples
└── [optional files]     # Tests, styles, etc.
```

For consolidated components, include a README.md with:

- Component description
- Props documentation
- Usage examples
- Migration notes (if applicable)

## Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { ButtonName } from './ButtonName';
```
