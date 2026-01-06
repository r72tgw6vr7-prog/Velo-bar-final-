# Organisms

In atomic design, organisms are complex UI components composed of molecules and atoms. They form distinct sections of the interface.

## What belongs here?

- **Header**: Site header with navigation
- **Footer**: Site footer with links and information
- **NavigationBar**: Full navigation component
- **Form**: Complete form with multiple inputs and submission
- **Modal**: Complex modal dialog
- **Sidebar**: Side navigation or panel
- **Table**: Data table with sorting, filtering
- **Carousel**: Image or content carousel
- **Calendar**: Date picker or calendar view

## Guidelines

1. **Composed of Molecules and Atoms**: Organisms combine smaller components
2. **Complex Functionality**: Can have more complex logic and state
3. **Section of Interface**: Forms a distinct section of the UI
4. **May Include API Calls**: Can connect to data sources
5. **May Manage State**: Can have more complex state management

## Structure

Each organism should follow this structure:

```
NavigationBar/
├── NavigationBar.tsx   # Component implementation
├── index.ts           # Export file
├── components/        # Organism-specific components (if needed)
└── [optional files]   # Tests, styles, etc.
```

## Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { NavigationBar } from './NavigationBar';
```
