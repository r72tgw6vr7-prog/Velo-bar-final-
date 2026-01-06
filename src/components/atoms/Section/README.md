# Section Component

A versatile, design-system-compliant section/container component for page layout.

## Features

- Automatic vertical spacing (py) on 8px grid
- Responsive spacing breakpoints
- Container width variants (none, default, wide, narrow)
- Horizontal padding (px) with responsive values
- Background variants (transparent, dark, darker, brand, light)
- Custom component rendering (as='div'/'section'/'article'/etc)
- ARIA support for accessibility
- 100% spacing compliance (8px grid)

## Usage

### Basic Usage

```tsx
import { Section } from '../components/atoms/Section';

function MyPage() {
  return (
    <Section spacing='lg' container='default'>
      <h2>Section Title</h2>
      <p>Section content...</p>
    </Section>
  );
}
```

### With Background

```tsx
import { Section } from '../components/atoms/Section';

function MyPage() {
  return (
    <Section spacing='xl' background='dark' container='wide'>
      <h2>Dark Section</h2>
      <p>Content on dark background...</p>
    </Section>
  );
}
```

### Responsive Spacing

```tsx
import { Section } from '../components/atoms/Section';

function MyPage() {
  return (
    <Section
      spacing={{
        mobile: 'sm', // smaller on mobile
        tablet: 'md', // medium on tablets
        desktop: 'lg', // large on desktop
      }}
      background='brand-subtle'
    >
      <h2>Responsive Section</h2>
      <p>This section has different spacing at different breakpoints</p>
    </Section>
  );
}
```

### Full Width (No Container)

```tsx
import { Section } from '../components/atoms/Section';

function MyPage() {
  return (
    <Section spacing='md' container='none' background='darker'>
      <div className='relative w-full'>
        {/* Full width content with custom layout */}
        <div className='absolute inset-0'>
          <img src='/hero-bg.jpg' alt='' className='h-full w-full object-cover' />
        </div>
        <div className='relative z-10 px-4 py-24 text-center text-white'>
          <h1>Full Width Hero</h1>
          <p>With no container constraints</p>
        </div>
      </div>
    </Section>
  );
}
```

### Custom Element Type

```tsx
import { Section } from '../components/atoms/Section';

function MyPage() {
  return (
    <Section as='article' id='blog-post' spacing='lg'>
      <h1>Blog Post Title</h1>
      <p>Blog content...</p>
    </Section>
  );
}
```

## Props

| Prop             | Type                | Default       | Description                            |
| ---------------- | ------------------- | ------------- | -------------------------------------- |
| `children`       | React.ReactNode     | _required_    | Content of the section                 |
| `spacing`        | string or object    | 'md'          | Vertical spacing size (8px grid)       |
| `container`      | string              | 'default'     | Container width and horizontal padding |
| `background`     | string              | 'transparent' | Background style                       |
| `className`      | string              | ''            | Additional CSS classes                 |
| `id`             | string              | undefined     | HTML ID attribute                      |
| `ariaLabel`      | string              | undefined     | ARIA label for accessibility           |
| `ariaLabelledBy` | string              | undefined     | ID of element that labels this section |
| `as`             | string              | 'section'     | Render as a different HTML element     |
| `style`          | React.CSSProperties | undefined     | Custom inline styles (use sparingly)   |

### Spacing Options

- `'none'`: No vertical padding
- `'xs'`: 16px (2×8) padding
- `'sm'`: 32px (4×8) padding
- `'md'`: 64px (8×8) padding
- `'lg'`: 96px (12×8) padding
- `'xl'`: 128px (16×8) padding
- `'2xl'`: 192px (24×8) padding

Or as a responsive object:

```
{
  mobile: 'sm',   // For mobile screens
  tablet: 'md',   // For tablets (md: breakpoint)
  desktop: 'lg',  // For desktop (lg: breakpoint)
}
```

### Container Options

- `'none'`: No container, children take full width
- `'default'`: Standard container (max-w-7xl)
- `'wide'`: Wide container (max-w-screen-2xl)
- `'narrow'`: Narrow container (max-w-5xl)

### Background Options

- `'default'`: Design system background color
- `'transparent'`: No background color
- `'dark'`: Dark gray (#1A1A1A)
- `'darker'`: Black
- `'brand'`: Brand primary color (orange)
- `'brand-subtle'`: Subtle gradient with brand color
- `'light'`: White background

## Accessibility

This component follows accessibility best practices:

- Uses semantic HTML elements (`<section>` by default)
- Supports ARIA labeling via `ariaLabel` and `ariaLabelledBy`
- Can be rendered as different semantic elements via the `as` prop

## Migration Notes

This component consolidates functionality from:

- `atoms/Section.tsx`
- `primitives/Section.tsx`

The original components are still available for backward compatibility but will be deprecated in future versions.
