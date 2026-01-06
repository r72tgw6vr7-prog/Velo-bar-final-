/**
 * SPACING TOKENS
 *
 * Defines a consistent 8pt spacing scale as CSS variables
 * and provides TypeScript types for type safety.
 */

// Base spacing unit (8px)
const BASE_UNIT = 8;

/**
 * Spacing scale - 8pt Grid System
 * Allowed values: 0, 4, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128
 *
 * REMOVED non-8pt values:
 * - 1.5 (12px) → use '2' (16px) or '1' (8px)
 * - 2.5 (20px) → use '3' (24px) or '2' (16px)
 * - 7 (56px) → use '8' (64px) or '6' (48px)
 * - 9 (72px) → use '10' (80px) or '8' (64px)
 */
const spacing = {
  // Core 8pt grid values
  '0': '0',
  '0.5': `${BASE_UNIT * 0.5}px`, // 4px (half unit - acceptable)
  '1': `${BASE_UNIT}px`, // 8px
  '2': `${BASE_UNIT * 2}px`, // 16px
  '3': `${BASE_UNIT * 3}px`, // 24px
  '4': `${BASE_UNIT * 4}px`, // 32px
  '5': `${BASE_UNIT * 5}px`, // 40px
  '6': `${BASE_UNIT * 6}px`, // 48px (touch target minimum)
  '8': `${BASE_UNIT * 8}px`, // 64px
  '10': `${BASE_UNIT * 10}px`, // 80px
  '12': `${BASE_UNIT * 12}px`, // 96px
  '16': `${BASE_UNIT * 16}px`, // 128px
  '20': `${BASE_UNIT * 20}px`, // 160px
  '24': `${BASE_UNIT * 24}px`, // 192px
  '32': `${BASE_UNIT * 32}px`, // 256px
  '40': `${BASE_UNIT * 40}px`, // 320px
  '48': `${BASE_UNIT * 48}px`, // 384px
  '56': `${BASE_UNIT * 56}px`, // 448px
  '64': `${BASE_UNIT * 64}px`, // 512px

  // Semantic spacing (all 8pt compliant)
  'container-padding': `${BASE_UNIT * 2}px`, // 16px
  'section-padding': `${BASE_UNIT * 10}px`, // 80px
  'grid-gap': `${BASE_UNIT * 4}px`, // 32px
  'card-padding': `${BASE_UNIT * 3}px`, // 24px
  'button-padding': `${BASE_UNIT}px ${BASE_UNIT * 3}px`, // 8px 24px (was 12px 24px)
  'input-padding': `${BASE_UNIT}px ${BASE_UNIT * 2}px`, // 8px 16px (was 12px 16px)
} as const;

// Generate CSS variables for spacing
export const spacingVariables = Object.entries(spacing).reduce(
  (acc, [key, value]) => {
    // Skip semantic names from CSS variables
    if (key.includes('-')) return acc;

    return {
      ...acc,
      [`--spacing-${key}`]: value,
    };
  },
  {} as Record<string, string>,
);

// Export the spacing object with TypeScript types
export type SpacingScale = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingScale];

export default spacing;
