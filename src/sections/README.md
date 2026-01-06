# Medusa Web Sections

This directory contains the major sections that make up the pages of the Medusa Web application. Sections are larger, more complex components that typically represent a distinct area of a page.

## Section Structure

Each section is organized in its own directory with the following structure:

```
SectionName/
├── SectionName.tsx       // Section component implementation
├── index.ts              // Export file
└── components/           // Section-specific components (if needed)
```

## Relationship to Atomic Design

Sections are composed of multiple components from the atomic design hierarchy:

- They primarily use organisms and molecules
- They may occasionally use atoms directly
- They are used by pages or templates

Sections sit between organisms and pages in the component hierarchy.

## Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { SectionName } from './SectionName';
```

## Guidelines

1. Each section should be completely self-contained
2. Sections should be responsive across all breakpoints
3. Props should be clearly documented with TypeScript interfaces
4. Section components should be lazy-loaded when appropriate for performance
5. Follow accessibility best practices
