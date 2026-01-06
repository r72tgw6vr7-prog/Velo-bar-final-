# Templates

In atomic design, templates define page layouts without specific content. They provide the structure for pages.

## What belongs here?

- **PageTemplate**: Basic page layout with header, footer, and content area
- **DashboardTemplate**: Layout for dashboard pages
- **ArticleTemplate**: Layout for article or blog pages
- **LandingPageTemplate**: Structure for landing pages
- **ProfileTemplate**: Layout for user profile pages
- **AuthTemplate**: Layout for authentication pages

## Guidelines

1. **Define Layout Structure**: Templates focus on the arrangement of components
2. **Content Placeholders**: Use placeholders instead of real content
3. **Component Composition**: Combine organisms, molecules, and atoms
4. **Responsive Design**: Should be responsive across different screen sizes
5. **Reusable Across Pages**: Should be reusable for multiple pages

## Structure

Each template should follow this structure:

```
PageTemplate/
├── PageTemplate.tsx   # Component implementation
├── index.ts          # Export file
└── [optional files]  # Tests, styles, etc.
```

## Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { PageTemplate } from './PageTemplate';
```
