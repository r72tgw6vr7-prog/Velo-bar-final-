# Background System Documentation

## Architecture

The Medusa website uses a layered background system with strict z-index hierarchy:

```
Layer 0 (z-0):  Universal Texture (fixed, covers viewport)
Layer 1 (z-1):  Overlay 20% (fixed, darkens texture)
Layer 10 (z-10): App Content (relative)
Layer 20 (z-20): Section Photos (Hero, Services, etc.)
Layer 30 (z-30): Navigation (sticky)
Layer 50 (z-50): Modals/Dropdowns (absolute)
```

## Components

### UniversalTextureBackground

**Location:** `src/components/atoms/UniversalTextureBackground.tsx`

**Rendered in:** `src/main.tsx` (once, outside App component)

**Purpose:** Provides the universal texture background and overlay for the entire site.

**Implementation:**

```tsx
<UniversalTextureBackground />
<App />
```

**DO NOT:**

- Create multiple instances
- Render inside App component
- Modify z-index values

## Texture Image

**Source of Truth:** `/public/texture.webp` (31KB, 2419×2172px)

**Settings:**

- `backgroundSize: 'cover'` - Scales to fill viewport
- `backgroundPosition: 'center'` - Centers the image
- `backgroundAttachment: 'fixed'` - Stays fixed during scroll
- `backgroundRepeat: 'no-repeat'` - No tiling

**DO NOT:**

- Use multiple texture files
- Use tiling patterns (background-repeat: repeat)
- Use small background-size values (e.g., 400px 400px)

## Overlay System

### Tailwind Tokens

Use these standardized overlay classes for darkening backgrounds:

```tsx
// Subtle darkening (20% black)
<div className="bg-overlay-subtle">Content</div>

// Medium darkening (40% black)
<div className="bg-overlay-medium">Content</div>

// Heavy darkening (60% black)
<div className="bg-overlay-heavy">Content</div>
```

### Legacy Classes (Being Phased Out)

These classes still exist but should be replaced with tokens:

- `bg-black/20` → `bg-overlay-subtle`
- `bg-black/40` → `bg-overlay-medium`
- `bg-black/60` → `bg-overlay-heavy`

## Usage Guide

### For Page Backgrounds

**The universal texture is automatic** - no component-level changes needed:

```tsx
// ❌ DON'T do this
function MyPage() {
  return (
    <UniversalTextureBackground /> {/* Already rendered in main.tsx! */}
    <div>Page content</div>
  );
}

// ✅ DO this
function MyPage() {
  return (
    <div>Page content</div> {/* Texture already visible */}
  );
}
```

### For Section Photo Backgrounds

Hero sections, service cards, and other photo backgrounds should use z-20:

```tsx
<div
  className='relative z-20 bg-cover bg-center'
  style={{ backgroundImage: 'url(/path/to/photo.webp)' }}
>
  <div className='bg-overlay-medium'>
    {' '}
    {/* Optional darkening */}
    Content appears above photo and texture
  </div>
</div>
```

### For Content Cards

Use overlay tokens for semi-transparent backgrounds:

```tsx
<div className='rounded-lg bg-overlay-subtle p-8'>Card content with subtle darkening</div>
```

## Z-Index System

**Strict hierarchy - DO NOT deviate:**

| Layer      | Z-Index | Usage                            | Example                    |
| ---------- | ------- | -------------------------------- | -------------------------- |
| Texture    | 0       | Universal texture background     | UniversalTextureBackground |
| Overlay    | 1       | Universal overlay (20% black)    | UniversalTextureBackground |
| Content    | 10      | Main app content wrapper         | App.tsx wrapper            |
| Photos     | 20      | Hero images, section backgrounds | HeroSection, ServiceCards  |
| Navigation | 30      | Sticky navigation                | MainNavigation             |
| Modals     | 50      | Dropdowns, tooltips, modals      | Modal components           |

**Common Mistakes:**

```tsx
// ❌ WRONG - Conflicts with texture (z-0)
<div className="z-0">Background element</div>

// ✅ CORRECT - Use z-auto or no z-index
<div className="z-auto">Background element</div>

// ❌ WRONG - Arbitrary z-index
<div className="z-5">Some content</div>

// ✅ CORRECT - Use defined values
<div className="z-10">Content</div>
```

## File Structure

```
/public/
  texture.webp                              # ✅ Source of truth (31KB)

/src/
  main.tsx                                  # ✅ Renders UniversalTextureBackground
  components/atoms/
    UniversalTextureBackground.tsx          # ✅ Main background component
  docs/
    BACKGROUND_SYSTEM.md                    # ✅ This file
```

## Deleted Files (Dead Code Removed)

The following files were removed during cleanup:

```
❌ src/components/atoms/TextureBackground.tsx
❌ src/components/atoms/TextureBackground20.tsx
❌ src/components/atoms/TextureBackground40.tsx
❌ src/components/atoms/TextureBackgroundAlt.tsx
❌ src/components/atoms/TextureBackgroundBody.tsx
❌ src/components/atoms/TextureOverlay.tsx
❌ src/styles/background-texture.css
❌ src/styles/texture-test.css
❌ public/assets/images/textures/background-texture.webp
❌ public/assets/images/textures/background-texture@400w.webp
❌ public/assets/images/textures/background-texture@800w.webp
```

## Do's and Don'ts

### ✅ DO:

- Use `bg-overlay-subtle`, `bg-overlay-medium`, `bg-overlay-heavy` for darkening
- Keep z-index values from the defined system
- Use `UniversalTextureBackground` once in `main.tsx`
- Use `z-20` for section photo backgrounds
- Document any new background patterns

### ❌ DON'T:

- Create new texture components
- Use arbitrary z-index values (z-5, z-15, z-25, etc.)
- Apply backgrounds at body level (use component instead)
- Use multiple opacity values (stick to 20%, 40%, 60%)
- Use `bg-black/XX` syntax (use tokens instead)
- Render `UniversalTextureBackground` multiple times

## Troubleshooting

### Texture Not Visible

1. Check `globals.css` - body should have `background-color: transparent`
2. Check `main.tsx` - `UniversalTextureBackground` should render before `<App />`
3. Check z-index - ensure no elements use `z-0` (conflicts with texture)
4. Hard refresh browser (Cmd+Shift+R)

### Content Hidden Behind Texture

1. Ensure content wrapper has `relative z-10` or higher
2. Check parent containers don't have conflicting z-index
3. Use browser DevTools to inspect z-index values

### Photo Backgrounds Not Showing

1. Ensure element has `relative z-20` (above texture at z-0)
2. Check `backgroundImage` path is correct
3. Use `bg-cover bg-center` for proper sizing

## Performance

- **Texture file size:** 31KB (optimized WebP)
- **Render cost:** Minimal (single fixed element)
- **Paint cost:** None (pointer-events: none)
- **Layout thrashing:** None (no reflows)

**Lighthouse Impact:** No negative impact on performance score.

## Questions?

For implementation details, refer to:

- `src/components/atoms/UniversalTextureBackground.tsx` - Reference implementation
- `src/main.tsx` - Rendering location
- `tailwind.config.mjs` - Overlay token definitions

---

**Last Updated:** November 5, 2025  
**Version:** 1.0  
**Status:** ✅ Implemented and tested
