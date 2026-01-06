# Medusa Web Component Structure

This project follows the Atomic Design methodology for organizing React components. This README explains the structure and guidelines for each component level.

## Atomic Design Pattern

The Atomic Design pattern breaks down interfaces into five distinct levels:

### 1. Atoms

Located in: `/src/components/atoms/`

The basic building blocks of the application:

- Buttons
- Input fields
- Icons
- Typography elements
- Labels

Atoms are the simplest components that cannot be broken down further while still maintaining their functionality.

### 2. Molecules

Located in: `/src/components/molecules/`

Simple combinations of atoms that form small, functional components:

- Form groups (label + input + error message)
- Card headers
- Search bars
- Navigation items

Molecules are reusable components that serve a single purpose.

### 3. Organisms

Located in: `/src/components/organisms/`

Complex UI components composed of molecules and atoms:

- Forms
- Headers
- Footers
- Card lists
- Navigation bars

Organisms form distinct sections of the interface.

### 4. Templates

Located in: `/src/components/templates/`

Page layouts without specific content:

- Page layouts
- Article layouts
- Dashboard layouts

Templates define content structure and placement of organisms.

### 5. Pages

Located in: `/src/pages/`

Specific instances of templates with actual content:

- Home page
- About page
- Contact page
- Profile page

## Component Organization

Each component should be organized in its own directory with the following structure:

```
ComponentName/
├── ComponentName.tsx     // Component implementation
├── ComponentName.test.tsx // Tests (if applicable)
├── ComponentName.module.css // Component-specific styles (if applicable)
├── index.ts              // Export file
└── types.ts              // TypeScript types/interfaces (if needed)
```

### Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { ComponentName } from './ComponentName';
```

## Usage Guidelines

1. Keep components as pure and reusable as possible
2. Maintain single responsibility principle
3. Use TypeScript interfaces for props
4. Document complex components with JSDoc comments
5. Follow the project's styling guidelines and design tokens

## Section Components

Larger page sections that combine multiple organisms are located in:
`/src/sections/`

These represent complete sections of a page, like a hero section or testimonials section.

## Utility Functions

Common utility functions should be placed in:
`/src/utils/`
