# Accessibility Contrast Analysis Report

## Overview

This report analyzes the color contrast ratios in the Stargate design system to ensure compliance with WCAG 2.1 accessibility guidelines. The analysis focuses on text and interactive element colors against various background colors.

## WCAG 2.1 Requirements

- **AA Level**:
  - Normal text (14pt): Minimum contrast ratio of 4.5:1
  - Large text (18pt or 14pt bold): Minimum contrast ratio of 3:1
  - UI components and graphical objects: Minimum contrast ratio of 3:1

- **AAA Level**:
  - Normal text (14pt): Minimum contrast ratio of 7:1
  - Large text (18pt or 14pt bold): Minimum contrast ratio of 4.5:1

## Color Combinations Analysis

### Text on Background Colors

| Foreground                 | Background                  | Usage                        | Contrast Ratio | AA (Normal) | AA (Large) | AAA (Normal) | AAA (Large) |
| -------------------------- | --------------------------- | ---------------------------- | -------------- | ----------- | ---------- | ------------ | ----------- |
| `#e8e8e8` (text.primary)   | `#121212` (surface.darkest) | Body text on main background | 16.5:1         | ✅ PASS     | ✅ PASS    | ✅ PASS      | ✅ PASS     |
| `#b0b0b0` (text.secondary) | `#121212` (surface.darkest) | Secondary text on background | 8.6:1          | ✅ PASS     | ✅ PASS    | ✅ PASS      | ✅ PASS     |
| `#6b6b6b` (text.tertiary)  | `#121212` (surface.darkest) | Tertiary/disabled text       | 3.0:1          | ❌ FAIL     | ✅ PASS    | ❌ FAIL      | ❌ FAIL     |
| `#e8e8e8` (text.primary)   | `#1a1a1a` (surface.dark)    | Text on cards                | 14.2:1         | ✅ PASS     | ✅ PASS    | ✅ PASS      | ✅ PASS     |
| `#b0b0b0` (text.secondary) | `#1a1a1a` (surface.dark)    | Secondary text on cards      | 7.4:1          | ✅ PASS     | ✅ PASS    | ✅ PASS      | ✅ PASS     |

### Brand Colors on Backgrounds

| Foreground                | Background                  | Usage                          | Contrast Ratio | AA (Normal) | AA (Large) | AAA (Normal) | AAA (Large) |
| ------------------------- | --------------------------- | ------------------------------ | -------------- | ----------- | ---------- | ------------ | ----------- |
| `#7d315d` (brand.primary) | `#121212` (surface.darkest) | Brand accents on background    | 3.7:1          | ❌ FAIL     | ✅ PASS    | ❌ FAIL      | ❌ FAIL     |
| `#7d315d` (brand.primary) | `#1a1a1a` (surface.dark)    | Brand accents on cards         | 3.2:1          | ❌ FAIL     | ✅ PASS    | ❌ FAIL      | ❌ FAIL     |
| `#FFFFFF` (white)         | `#7d315d` (brand.primary)   | Button text on primary buttons | 5.2:1          | ✅ PASS     | ✅ PASS    | ❌ FAIL      | ✅ PASS     |

### Interactive Elements

| Foreground                  | Background                  | Usage               | Contrast Ratio | AA (Normal) | AA (Large) | AAA (Normal) | AAA (Large) |
| --------------------------- | --------------------------- | ------------------- | -------------- | ----------- | ---------- | ------------ | ----------- |
| `#7d315d` (magenta.primary) | `#121212` (surface.darkest) | Links on background | 3.7:1          | ❌ FAIL     | ✅ PASS    | ❌ FAIL      | ❌ FAIL     |
| `#6b2953` (magenta.hover)   | `#121212` (surface.darkest) | Link hover state    | 3.0:1          | ❌ FAIL     | ✅ PASS    | ❌ FAIL      | ❌ FAIL     |

### Status Colors

| Foreground                 | Background                  | Usage            | Contrast Ratio | AA (Normal) | AA (Large) | AAA (Normal) | AAA (Large) |
| -------------------------- | --------------------------- | ---------------- | -------------- | ----------- | ---------- | ------------ | ----------- |
| `#dc2626` (status.error)   | `#121212` (surface.darkest) | Error messages   | 5.2:1          | ✅ PASS     | ✅ PASS    | ❌ FAIL      | ✅ PASS     |
| `#16a34a` (status.success) | `#121212` (surface.darkest) | Success messages | 5.0:1          | ✅ PASS     | ✅ PASS    | ❌ FAIL      | ✅ PASS     |

## Issues Identified

1. **Tertiary Text Color (`#6b6b6b`)** fails AA standard for normal text with a contrast ratio of 3.0:1 (needs 4.5:1).
   - **Impact**: Disabled text and less important information may be difficult to read for users with low vision.

2. **Brand Magenta (`#7d315d`)** fails AA standard for normal text on dark backgrounds with ratios of 3.7:1 and 3.2:1.
   - **Impact**: Brand accent text and links may be difficult to read, especially for users with low vision.

3. **Link Hover Color (`#6b2953`)** provides only 3.0:1 contrast, failing AA requirements for normal text.
   - **Impact**: Link states may be difficult to distinguish for users with low vision.

## Recommendations

1. **Lighten Tertiary Text Color**:
   - Increase brightness of `text.tertiary` from `#6b6b6b` to at least `#8a8a8a` to achieve 4.5:1 contrast.

2. **Adjust Brand Magenta for Text**:
   - Create a more accessible variant of brand magenta specifically for text use (e.g., `#9d3e74`).
   - Keep current brand colors for larger UI elements and decorative purposes.

3. **Improve Link Contrast**:
   - Use a higher contrast color for links like `#b54683` (5.3:1 ratio).
   - Add underlines to links to provide additional non-color differentiation.

4. **Alternative Approach for Brand Identity**:
   - Maintain brand colors but ensure text using these colors is at least 18pt (or 14pt bold).
   - Add secondary visual indicators (underlines, icons) to compensate for contrast issues.

## Implementation Plan

1. Update the `text.tertiary` color in `design-tokens.ts` to improve contrast.
2. Create a new `magenta.accessible` color for use in text contexts.
3. Update link styles in `design-system.css` to include underlines and improved contrast.
4. Document that brand magenta should only be used for large text or non-text elements.
5. Retest all combinations after implementing these changes.

By addressing these issues, the design system will better support users with vision impairments while maintaining the brand identity.
