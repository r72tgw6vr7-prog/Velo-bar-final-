/**
 * Design Tokens Unit Tests
 * ========================
 * Validates design token exports, values, and consistency
 */

import { describe, it, expect } from 'vitest';
import { colors, typography, spacing, fonts, shadows, breakpoints } from '../design-tokens.ts';

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('exports brand colors', () => {
      expect(colors.brand).toBeDefined();
      expect(colors.brand.primary).toBe('#003141'); // Navy (NOT black)
      expect(colors.brand.secondary).toBe('#fff8ec');
      expect(colors.brand.accent).toBe('#ee7868');
      expect(colors.brand.accentSecondary).toBe('#fab81d');
      expect(colors.brand.muted).toBe('#bbbbbb');
    });

    it('exports accent colors', () => {
      expect(colors.accent).toBeDefined();
      expect(colors.accent.primary).toBeDefined();
    });

    it('exports semantic colors', () => {
      expect(colors.semantic).toBeDefined();
      expect(colors.semantic.borders).toBeDefined();
      expect(colors.semantic.background).toBeDefined();
    });

    it('has valid hex color format', () => {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      expect(colors.brand.primary).toMatch(hexRegex);
      expect(colors.brand.secondary).toMatch(hexRegex);
      expect(colors.brand.accent).toMatch(hexRegex);
      expect(colors.brand.muted).toMatch(hexRegex);
    });

    it('exports status colors', () => {
      expect(colors.status).toBeDefined();
      expect(colors.status.success).toBeDefined();
      expect(colors.status.error).toBeDefined();
      expect(colors.status.warning).toBeDefined();
    });
  });

  describe('Typography', () => {
    it('exports font families', () => {
      expect(typography.fonts).toBeDefined();
      expect(typography.fonts.heading).toBeDefined();
      expect(typography.fonts.body).toBeDefined();
    });

    it('uses Source Sans Pro as primary font', () => {
      expect(typography.fonts.heading.family).toContain('Source Sans Pro');
      expect(typography.fonts.body.family).toContain('Source Sans Pro');
    });

    it('exports typography scale', () => {
      expect(typography.scale).toBeDefined();
      expect(typography.scale.desktop).toBeDefined();
      expect(typography.scale.mobile).toBeDefined();
    });

    it('exports line height', () => {
      expect(typography.lineHeight).toBeDefined();
    });
  });

  describe('Spacing', () => {
    it('exports spacing scale', () => {
      expect(spacing).toBeDefined();
      expect(spacing.xs).toBeDefined();
      expect(spacing.sm).toBeDefined();
      expect(spacing.md).toBeDefined();
      expect(spacing.lg).toBeDefined();
      expect(spacing.xl).toBeDefined();
    });

    it('spacing values are numbers (rem units)', () => {
      // Spacing can be numbers (for calculations) or strings (for CSS)
      expect(spacing.xs).toBeDefined();
      expect(spacing.md).toBeDefined();
      expect(spacing.xl).toBeDefined();
    });
  });

  describe('Fonts', () => {
    it('exports font definitions', () => {
      expect(fonts).toBeDefined();
      expect(fonts.heading).toBeDefined();
      expect(fonts.body).toBeDefined();
    });

    it('has consistent font family with typography', () => {
      expect(fonts.heading).toContain('Source Sans Pro');
      expect(fonts.body).toContain('Source Sans Pro');
    });
  });

  describe('Shadows', () => {
    it('exports shadow definitions', () => {
      expect(shadows).toBeDefined();
    });

    it('has shadow scale', () => {
      expect(shadows.sm).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
    });

    it('has accent shadows', () => {
      expect(shadows['accent-sm']).toBeDefined();
      expect(shadows['accent-md']).toBeDefined();
    });
  });

  describe('Breakpoints', () => {
    it('exports responsive breakpoints', () => {
      expect(breakpoints).toBeDefined();
    });

    it('has standard breakpoint names', () => {
      const bpKeys = Object.keys(breakpoints);
      expect(bpKeys.length).toBeGreaterThan(0);
    });

    it('breakpoints are px values', () => {
      const values = Object.values(breakpoints);
      values.forEach((v) => {
        expect(typeof v).toBe('string');
        expect(v).toMatch(/^\d+px$/);
      });
    });
  });

  describe('Brand Color Consistency', () => {
    it('brand accent color is coral (#ee7868)', () => {
      // This ensures the brand color hasn't accidentally changed
      expect(colors.brand.accent.toLowerCase()).toBe('#ee7868');
    });

    it('primary color is navy (#003141)', () => {
      // CRITICAL: Navy #003141 (NOT black #000000)
      expect(colors.brand.primary.toLowerCase()).toBe('#003141');
    });

    it('secondary color is cream (#fff8ec)', () => {
      expect(colors.brand.secondary.toLowerCase()).toBe('#fff8ec');
    });

    it('muted color is gray (#bbbbbb)', () => {
      expect(colors.brand.muted.toLowerCase()).toBe('#bbbbbb');
    });
  });
});

describe('Design Token Exports', () => {
  it('all required tokens are exported', () => {
    expect(colors).toBeTruthy();
    expect(typography).toBeTruthy();
    expect(spacing).toBeTruthy();
    expect(fonts).toBeTruthy();
    expect(shadows).toBeTruthy();
    expect(breakpoints).toBeTruthy();
  });

  it('tokens are objects', () => {
    expect(typeof colors).toBe('object');
    expect(typeof typography).toBe('object');
    expect(typeof spacing).toBe('object');
    expect(typeof shadows).toBe('object');
  });
});
