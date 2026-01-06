/**
 * Cosmic Glassmorphism Components
 * ================================
 * Unified exports for cosmic glass design system
 */

// Glass Components
export { GlassCard } from './molecules/GlassCard';
export type { GlassCardProps } from './molecules/GlassCard';

// GlassNavigation removed - moved to _ARCHIVE, use CosmicNav instead
export { CosmicNav } from './organisms/CosmicNav';

export { GlassButton } from './atoms/GlassButton';
export type { GlassButtonProps } from './atoms/GlassButton';

export { CosmicBackground } from './atoms/CosmicBackground';
export type { CosmicBackgroundProps } from './atoms/CosmicBackground';

// Also export clean components that work well with cosmic theme
export { Heading } from './atoms/Heading';
export { Text } from './atoms/Text';
export { GridClean as Grid } from './atoms/Grid.clean';
export { SectionClean as Section } from './atoms/Section.clean';
export { Container as Container } from './atoms/Container/Container';
