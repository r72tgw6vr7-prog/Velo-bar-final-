// ============================================
// Page Component Props
// ============================================

export interface GalleryPageProps {
  onBookNow?: () => void;
  showFilter?: boolean;
}

export interface ArtistsPageProps {
  onBookArtist?: (artistId: string) => void;
}

export interface FollowupPageProps {
  onBookTouchUp?: () => void;
}

export interface FooterProps {
  onNavigate?: (page: string) => void;
}

// ============================================
// Consolidated Component Props
// ============================================

/**
 * Card Component Variants
 * Consolidated from atoms/Card and molecules/Card
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'bordered' | 'glass';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface ConsolidatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Padding size following 8px grid */
  padding?: CardPadding;
  /** Enable hover effects (lift on hover) */
  hover?: boolean;
  /** Show selected state with ring */
  selected?: boolean;
  /** Background image URL */
  backgroundImage?: string;
  /** Show gradient overlay on background image */
  overlay?: boolean;
  /** Card content */
  children: React.ReactNode;
  /** Accessibility role */
  role?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Click handler (makes card interactive) */
  onClick?: () => void;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by */
  'aria-labelledby'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
}

/**
 * Input Component Variants
 * Consolidated from Input, FormInput, InputField, ConsolidatedInput
 */
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost';
export type IconPosition = 'left' | 'right';
export type ValidationState = 'default' | 'error' | 'success';
export type InputColorScheme = 'dark' | 'light';

export interface ConsolidatedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Unique ID (required for accessibility) */
  id: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: IconPosition;
  /** Full width */
  fullWidth?: boolean;
  /** Size variant */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Validation state */
  validationState?: ValidationState;
  /** Color scheme */
  colorScheme?: InputColorScheme;
  /** Required field indicator */
  required?: boolean;
}

/**
 * Button Component Variants
 * Already consolidated using class-variance-authority
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'default'
  | 'outline'
  | 'ghost'
  | 'accent'
  | 'outlineAccent';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ConsolidatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
  /** Loading state */
  isLoading?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right' | 'end';
  /** Button content */
  children: React.ReactNode;
  /** Render as child element (Radix compatibility) */
  asChild?: boolean;
}

// ============================================
// Deprecated Component Props (For Migration)
// ============================================

/**
 * @deprecated Use ConsolidatedCardProps instead
 * Legacy Card from molecules/Card
 */
export interface LegacyMoleculeCardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  selected?: boolean;
  backgroundImage?: string;
  overlay?: boolean;
  children: React.ReactNode;
}

/**
 * @deprecated Use ConsolidatedInputProps instead
 * Legacy FormInput
 */
export interface LegacyFormInputProps {
  fieldName?: string;
  label?: string;
  error?: string;
  [key: string]: any;
}

/**
 * @deprecated Use ConsolidatedInputProps instead
 * Legacy InputField
 */
export interface LegacyInputFieldProps {
  field?: string;
  helper?: string;
  [key: string]: any;
}

// ============================================
// Type Guards
// ============================================

export function isCardVariant(value: string): value is CardVariant {
  return ['default', 'elevated', 'outlined', 'bordered', 'glass'].includes(value);
}

export function isButtonVariant(value: string): value is ButtonVariant {
  return [
    'primary',
    'secondary',
    'tertiary',
    'default',
    'outline',
    'ghost',
    'accent',
    'outlineAccent',
  ].includes(value);
}

export function isInputVariant(value: string): value is InputVariant {
  return ['default', 'filled', 'outlined', 'ghost'].includes(value);
}
