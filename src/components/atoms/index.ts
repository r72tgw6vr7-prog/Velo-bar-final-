/**
 * FOUNDATION COMPONENTS
 * Single source of truth for core UI components
 */

// Button - Primary interactive element
export { Button, buttonVariants } from './Button/Button';
// Section - Layout container with consistent spacing
export { Section } from './Section/Section';
// Container - Width-constrained layout component
export { Container } from './Container/Container';
// PageBackground - Background component with proper z-indexing
export { PageBackground } from './PageBackground';
// GlassOverlay - Glass/frosted overlay effect for cosmic backgrounds
export { GlassOverlay } from './GlassOverlay';
// LoadingSpinner - unified site-wide loading indicator
export { LoadingSpinner } from './LoadingSpinner/LoadingSpinner';
// BrandLogo - Official brand logo component
export { BrandLogo } from './BrandLogo';

/**
 * LEGACY COMPONENTS
 * Maintained for backward compatibility
 */

// Badge primitive: small status or label indicator.
export * from './Badge/Badge';
// New foundational atoms
export { default as Toggle } from './Toggle';
export { default as DatePicker } from './DatePicker';
export { default as Avatar } from './Avatar';
export { default as Progress } from './Progress';
export { default as Spinner } from './Spinner';
export { default as Divider } from './Divider';
export { default as Label } from './Label';
export { default as Tag } from './Tag';
export { default as ThemeToggle } from './ThemeToggle';
export { default as BrandSwitcher, BrandBadge } from './BrandSwitcher';
// Icon primitive: SVG-based icons.
export * from './Icon/Icon';
// New consolidated Input component (preferred)
export { default as Input } from './Input';
// FormInput helpers and types.
export * from './Input/FormInput';
// TextArea primitive (multiline input).
export * from './TextArea';
// Alias: Textarea (canonical import for multiline input).
export { TextArea as Textarea } from './TextArea';
// Checkbox primitive (single checkbox input).
export * from './Checkbox';
// RadioGroup primitive (group of radio buttons).
export * from './RadioGroup';
// Container layout primitive (max-width and horizontal padding).
export * from './Container';
// Note: AccessibleButton was merged into Button
// ErrorBoundary removed (not exported).
// Grid layout utilities.
export * from './Grid';
export * from './Row';
export * from './Column';
export * from './Spacer';
// ImageWithFallback disabled (using native <img> with fallbacks).
// MicroInteractions: small animations and transitions helpers.
export * from './MicroInteractions';
// PlaceholderImage: safe placeholder visuals.
export * from './PlaceholderImage';
// TrustBadge: small trust indicator icon+label.
export * from './TrustBadge';
// PageBackground: themed background surfaces.
export * from './PageBackground';
export * from './PageTitle';
// GalleryImage: responsive image for galleries.
// export * from './GalleryImage'; // TODO: Create GalleryImage component
// ImageWithLoader: image with loading state.
export * from './ImageWithLoader';
// ResponsiveImage: size-adaptive image component.
export * from './ResponsiveImage';
// SafeImage: robust image loader with error handling.
export * from './SafeImage';
// UniversalTextureBackground: reusable textured backgrounds.
export * from './UniversalTextureBackground';

// Atoms wrappers for legacy UI replacements (canonical import path)
// PageHeader: standard page header with eyebrow/title/subtitle.
export * from './PageHeader';
// Select: styled HTML select input.
export * from './Select';
// Carousel: minimal carousel surface (content, items, controls).
export * from './Carousel';
// Checkbox: styled checkbox with label and error support
export { default as Checkbox } from './Checkbox';
// RadioGroup: styled radio button group with options
export { default as RadioGroup } from './RadioGroup';
// Radio: single radio input atom
export { default as Radio } from './Radio';
// Switch alias for Toggle for semantic naming
export { default as Switch } from './Toggle';
// Tooltip & Dialog lightweight wrappers
export { default as Tooltip } from './Tooltip';
export { default as Dialog } from './Dialog';

/**
 * ANIMATION COMPONENTS
 * Framer Motion powered animation primitives
 */

// ScrollReveal: animate children when scrolled into view
export { ScrollReveal } from './ScrollReveal';
// StaggerContainer: staggered animations for lists/grids
export { StaggerContainer, StaggerItem } from './StaggerContainer';
// AnimatedCard: card with hover effects and scroll reveal
export { AnimatedCard } from './AnimatedCard';
// Toast: animated success/error notifications
export { Toast } from './Toast';
// Skeleton: loading placeholder animations (canonical folder export)
export { Skeleton, SkeletonCard } from './Skeleton/index';
