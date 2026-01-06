# Velobar Corporate Site - Quick Start ⚡

**Mobile Cocktailbar & Event Catering Website**

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Set Up Environment Variables

Create a local env file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` as needed (email, maps, analytics, etc.).

## 3️⃣ Customize Business Details

Edit `src/config/site.ts` for Velobar business info:

```typescript
export const siteConfig = {
  name: 'Velobar - Mobile Cocktailbar & Event Catering',
  contact: {
    phone: '+49 000 0000000', // Update with real number
    email: 'info@velobar.de', // Update if different
  },
};
```

## 4️⃣ Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 5️⃣ Create Your First Page

```tsx
// src/pages/MyPage.tsx
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section';
import { Container } from '@/components/atoms/Container/Container';
import { Button } from '@/components/atoms';

export const MyPage = () => {
  return (
    <PageTemplate title='My Page' description='My new page' canonicalPath='/my-page'>
      <Section>
        <Container>
          <h1 className='text-4xl font-bold text-accent'>My Awesome Page</h1>
          <p className='text-(--color-text-on-dark-secondary) mt-4'>Add your content here.</p>
          <div className='mt-8'>
            <Button variant='primary' size='lg'>
              Jetzt anfragen
            </Button>
          </div>
        </Container>
      </Section>
    </PageTemplate>
  );
};
```

## 6️⃣ Build for Production

```bash
npm run build
npm run preview  # Test production build
```

## 📚 Need More?

- **README**: `README.md`
- **Project status**: `docs/PROJECT_STATUS.md`
- **Content layer guide**: `docs/CONTENT_GUIDE.md`
- **CSS rules**: `docs/CSS-ARCHITECTURE-RULES.md`

## 🎨 Available Components

### Atoms (Basic)

- `Button` - Interactive buttons
- `Section` - Layout section wrapper
- `Container` - Width-constrained layout container
- `GridClean` - Responsive grid primitive

### Molecules (Combined)

- `CardClean` - Generic card
- `HeroClean` - Hero section
- `FeatureCardClean` - Feature display

## 💡 Quick Tips

1. **All components are content-agnostic** - Pass content via props
2. **Use CSS variables** - Never hardcode colors
3. **Follow 8px grid** - Use spacing: 8, 16, 24, 32, etc.
4. **Compose components** - Build complex from simple
5. **Ask AI for help** - Keep docs in sync when changing architecture

## 🚀 Common Patterns

### Hero with CTA

```tsx
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section';
import { Container } from '@/components/atoms/Container/Container';
import { Button } from '@/components/atoms';

<PageTemplate title='Title' description='Subtitle' canonicalPath='/example'>
  <Section>
    <Container>
      <h1 className='text-4xl font-bold text-accent'>Title</h1>
      <p className='text-(--color-text-on-dark-secondary) mt-4'>Subtitle</p>
      <div className='mt-8'>
        <Button variant='primary'>CTA</Button>
      </div>
    </Container>
  </Section>
</PageTemplate>;
```

### Feature Grid

```tsx
<SectionClean spacing='xl'>
  <GridClean cols={3} gap='lg'>
    <FeatureCardClean title='Feature 1' description='...' />
    <FeatureCardClean title='Feature 2' description='...' />
    <FeatureCardClean title='Feature 3' description='...' />
  </GridClean>
</SectionClean>
```

### Card Layout

```tsx
<CardClean padding='lg' hoverable>
  <h3 className='text-xl font-semibold'>Card Title</h3>
  <p className='text-(--color-text-on-dark-secondary) mt-2'>Card content</p>
</CardClean>
```

---

**That's it!**
