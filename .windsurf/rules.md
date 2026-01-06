# Velobar Corporate Site - Windsurf AI Rules

## Core Principles

1. **Content Architecture**
   - All user-facing text lives in `src/content/**` TypeScript files
   - Components receive content via props or children
   - **Primary language: German** (München/Coburg markets)
   - **Secondary language: English** (international corporate clients)
   - Maintain bilingual support structure (de/en content files)

## Static Assets (Images)

- All images that must be reachable by the browser at runtime MUST live under `public/`.
- Gallery images MUST live only in the dedicated folder: `public/Velo Gallery/`
- Never create or reintroduce a nested `public/public/` folder.
- When referencing files in code, use URL paths as if `public/` is the web root:
  - Use: `/Velo Gallery/<image-base>` or `/images/<...>`
  - Do not use: `/public/...`

Examples

- `src="/Velo Gallery/messen/messen"`
- `src="/Velo Gallery/DSC09743"`
- `src="/images/services/messe"`

2. **Atomic Design Structure**
   - **Atoms**: Basic building blocks (Button, Heading, Text, Container, Section, Grid)
   - **Molecules**: Simple combinations (Card, Hero, FeatureCard)
   - **Organisms**: Complex sections (Header, Footer, Navigation)
   - **Templates**: Full page layouts (MainLayout, LandingLayout)
   - **Pages**: Specific page implementations with actual content

3. **Styling Rules**
   - Use Tailwind CSS for layout and spacing ONLY
   - All colors, fonts, and design tokens MUST use CSS variables from `src/styles/variables.css`
   - Use Tailwind v4 shorthand: `bg-(--color-brand-primary)` not `bg-[var(--color-brand-primary)]`
   - Follow 8px grid system: Use spacing-2, spacing-4, spacing-8, spacing-12, etc.
   - No hardcoded colors or values

4. **TypeScript**
   - Use strict prop typing
   - Export prop interfaces
   - Document all props with JSDoc comments

5. **Composition Over Inheritance**
   - Favor composition using `children` prop
   - Keep components small and single-purpose
   - Build complex layouts by composing simple components

6. **Accessibility**
   - WCAG AA compliance for all components
   - Semantic HTML always
   - Touch targets minimum 44px
   - Keyboard navigation support
   - ARIA labels where needed

## File Structure

```
src/
├── components/
│   ├── atoms/          # Smallest reusable elements
│   ├── molecules/      # Simple component groups
│   ├── organisms/      # Complex sections
│   └── templates/      # Full page layouts
├── styles/
│   └── variables.css   # All design tokens
└── pages/              # Actual page implementations
```

## Code Patterns

### ✅ CORRECT - Content-Agnostic Component

```typescript
export interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="p-8 rounded-lg bg-(--color-background-elevated)">
      {title && <h3 className="text-2xl font-(--font-heading)">{title}</h3>}
      {children}
    </div>
  );
};
```

### ❌ WRONG - Hardcoded Content

```typescript
export const Card = () => {
  return (
    <div className="p-6 rounded-lg bg-blue-500">
      <h3>My Special Title</h3>
      <p>Hardcoded text here</p>
    </div>
  );
};
```

## When Creating New Components

1. Start with atoms if the component is basic
2. Use existing atoms to build molecules
3. Accept all content via props or children
4. Use CSS variables for ALL styling
5. Follow TypeScript strict mode
6. Add prop documentation
7. Keep it generic and reusable

## CSS Variables Usage

Always reference design tokens from `src/styles/variables.css`:

- Colors: `--color-brand-primary`, `--color-text-primary`, etc.
- Spacing: `--spacing-4`, `--spacing-8`, etc.
- Fonts: `--font-heading`, `--font-body`
- Never hardcode values

## Example Page Structure

```typescript
import { Hero } from '@/components/molecules/Hero.clean';
import { Heading } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';

export const HomePage = () => {
  return (
    <Hero minHeight="full">
      <Heading level="h1">Your Custom Title Here</Heading>
      <Text>Your description goes here</Text>
      <Button variant="primary">Your CTA</Button>
    </Hero>
  );
};
```

## Tech Stack

- React 18+
- TypeScript (strict mode)
- Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Radix UI (accessible components)
