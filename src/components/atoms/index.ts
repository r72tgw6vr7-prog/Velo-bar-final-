/**
 * FOUNDATION COMPONENTS
 * Single source of truth for core UI components
 */

// Button - Primary interactive element
export { Button, buttonVariants } from './Button/index.ts';
// Section - Layout container with consistent spacing
export { Section } from './Section/Section.tsx';
// Container - Width-constrained layout component
export { Container } from './Container/Container.tsx';
// PageBackground - Background component with proper z-indexing
export { PageBackground } from './PageBackground.tsx';
// GlassOverlay - Glass/frosted overlay effect for cosmic backgrounds
export { GlassOverlay } from './GlassOverlay.tsx';
// LoadingSpinner - unified site-wide loading indicator
export { LoadingSpinner } from './LoadingSpinner/LoadingSpinner.tsx';
// BrandLogo - Official brand logo component
export { BrandLogo } from './BrandLogo.tsx';

/**
 * LEGACY COMPONENTS
 * Maintained for backward compatibility
 */

// Badge primitive: small status or label indicator.
export * from './Badge/Badge.tsx';
// ResponsiveImage: size-adaptive image component
export * from './ResponsiveImage/index.ts';
// Carousel: minimal carousel surface (content, items, controls)
export * from './Carousel.tsx';
// NOTE: The following exports are commented out due to missing files
// Uncomment as files are created or fixed:
/*
// New foundational atoms
export { default as Toggle } from './Toggle.ts';
export { default as DatePicker } from './DatePicker.ts';
export { default as Avatar } from './Avatar.ts';
export { default as Progress } from './Progress.ts';
export { default as Spinner } from './Spinner.ts';
export { default as Divider } from './Divider.ts';
export { default as Label } from './Label.ts';
export { default as Tag } from './Tag.ts';
export { default as ThemeToggle } from './ThemeToggle.ts';
export { default as BrandSwitcher, BrandBadge } from './BrandSwitcher.ts';
// Icon primitive: SVG-based icons.
export * from './Icon/Icon.ts';
// New consolidated Input component (preferred)
export { default as Input } from './Input/index.ts';
// FormInput helpers and types.
export * from './Input/FormInput.ts';
// TextArea primitive (multiline input).
export * from './TextArea.ts';
// Alias: Textarea (canonical import for multiline input).
export { TextArea as Textarea } from './TextArea.ts';
// Checkbox primitive (single checkbox input).
export * from './Checkbox.ts';
// RadioGroup primitive (group of radio buttons).
export * from './RadioGroup.ts';
// Container layout primitive (max-width and horizontal padding).
export * from './Container.ts';
// Note: AccessibleButton was merged into Button
// ErrorBoundary removed (not exported).
// Grid layout utilities.
export * from './Grid.ts';
export * from './Row.ts';
export * from './Column.ts';
export * from './Spacer.ts';
// ImageWithFallback disabled (using native <img> with fallbacks).
// MicroInteractions: small animations and transitions helpers.
export * from './MicroInteractions.ts';
// PlaceholderImage: safe placeholder visuals.
export * from './PlaceholderImage.ts';
// TrustBadge: small trust indicator icon+label.
export * from './TrustBadge.ts';
// PageBackground: themed background surfaces.
export * from './PageBackground.ts';
export * from './PageTitle.ts';
// GalleryImage: responsive image for galleries.
// export * from './GalleryImage.ts'; // TODO: Create GalleryImage component
// ImageWithLoader: image with loading state.
export * from './ImageWithLoader.ts';
// ResponsiveImage: size-adaptive image component.
export * from './ResponsiveImage/index.ts';
// SafeImage: robust image loader with error handling.
export * from './SafeImage.ts';
// UniversalTextureBackground: reusable textured backgrounds.
export * from './UniversalTextureBackground.ts';

// Atoms wrappers for legacy UI replacements (canonical import path)
// PageHeader: standard page header with eyebrow/title/subtitle.
export * from './PageHeader.ts';
// Select: styled HTML select input.
export * from './Select.ts';
// Carousel: minimal carousel surface (content, items, controls).
export * from './Carousel.ts';
// Checkbox: styled checkbox with label and error support
export { default as Checkbox } from './Checkbox.ts';
// RadioGroup: styled radio button group with options
export { default as RadioGroup } from './RadioGroup.ts';
// Radio: single radio input atom
export { default as Radio } from './Radio.ts';
// Switch alias for Toggle for semantic naming
export { default as Switch } from './Toggle.ts';
// Tooltip & Dialog lightweight wrappers
export { default as Tooltip } from './Tooltip.ts';
export { default as Dialog } from './Dialog.ts';

/**
 * ANIMATION COMPONENTS
 * Framer Motion powered animation primitives
 */

// NOTE: The following exports are commented out due to missing files
// Uncomment as files are created or fixed:
/*
// ScrollReveal: animate children when scrolled into view
export { ScrollReveal } from './ScrollReveal.ts';
// StaggerContainer: staggered animations for lists/grids
export { StaggerContainer, StaggerItem } from './StaggerContainer.ts';
// AnimatedCard: card with hover effects and scroll reveal
export { AnimatedCard } from './AnimatedCard.ts';
// Toast: animated success/error notifications
export { Toast } from './Toast.ts';
// Skeleton: loading placeholder animations (canonical folder export)
export { Skeleton, SkeletonCard } from './Skeleton/index.ts';
*/
