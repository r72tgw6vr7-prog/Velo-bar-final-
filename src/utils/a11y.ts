/**
 * Accessibility Utilities
 * ===================
 * Helper functions for improving component accessibility
 */

/**
 * Ensures aria-hidden is set to true for all elements outside the specified container
 * when it's activated (like for modals). Returns a cleanup function.
 *
 * @param containerId - ID of the container element that should remain accessible
 * @returns Cleanup function to restore hidden elements
 */
export const hideOthersFromScreenReader = (containerId: string): (() => void) => {
  const container = document.getElementById(containerId);
  if (!container) return () => {};

  const elementsToHide: HTMLElement[] = [];

  // Find all direct children of body that aren't the container
  document.body.childNodes.forEach((node) => {
    if (node instanceof HTMLElement && !node.contains(container) && node !== container) {
      // Only hide elements that aren't already hidden
      if (node.getAttribute('aria-hidden') !== 'true') {
        node.setAttribute('aria-hidden', 'true');
        elementsToHide.push(node);
      }
    }
  });

  // Return cleanup function
  return () => {
    elementsToHide.forEach((element) => {
      element.removeAttribute('aria-hidden');
    });
  };
};

/**
 * Adds necessary ARIA attributes to a dialog element
 *
 * @param element - Dialog element
 * @param label - Accessible name for the dialog
 */
export const makeDialogAccessible = (element: HTMLElement, label: string): void => {
  if (!element) return;

  // Add required ARIA attributes
  element.setAttribute('role', 'dialog');
  element.setAttribute('aria-modal', 'true');

  // Add label
  if (label) {
    const labelId = `${element.id || 'dialog'}-label`;
    const labelElement = document.getElementById(labelId);

    if (labelElement) {
      element.setAttribute('aria-labelledby', labelId);
    } else {
      element.setAttribute('aria-label', label);
    }
  }
};

/**
 * Creates a unique ID for accessibility purposes
 *
 * @param prefix - Prefix for the ID
 * @returns Unique ID
 */
export const uniqueId = (prefix = 'a11y'): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Adds proper keyboard interaction to a custom component (like a dropdown)
 *
 * @param element - Element to enhance
 * @param options - Configuration options
 */
export const makeKeyboardAccessible = (
  element: HTMLElement,
  options: {
    onEnter?: (event: KeyboardEvent) => void;
    onSpace?: (event: KeyboardEvent) => void;
    onEscape?: (event: KeyboardEvent) => void;
    onArrow?: (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => void;
    onTab?: (event: KeyboardEvent) => void;
    preventDefaultOn?: string[];
  } = {},
): (() => void) => {
  if (!element) return () => {};

  const handleKeyDown = (event: KeyboardEvent) => {
    // Prevent default if specified
    if (options.preventDefaultOn?.includes(event.key)) {
      event.preventDefault();
    }

    // Handle keyboard events
    switch (event.key) {
      case 'Enter':
        options.onEnter?.(event);
        break;
      case ' ':
        options.onSpace?.(event);
        break;
      case 'Escape':
        options.onEscape?.(event);
        break;
      case 'ArrowUp':
        options.onArrow?.('up', event);
        break;
      case 'ArrowDown':
        options.onArrow?.('down', event);
        break;
      case 'ArrowLeft':
        options.onArrow?.('left', event);
        break;
      case 'ArrowRight':
        options.onArrow?.('right', event);
        break;
      case 'Tab':
        options.onTab?.(event);
        break;
    }
  };

  element.addEventListener('keydown', handleKeyDown as EventListener);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown as EventListener);
  };
};

/**
 * Checks if an element meets WCAG contrast requirements
 *
 * @param foregroundColor - Foreground color in hex or rgb/rgba format
 * @param backgroundColor - Background color in hex or rgb/rgba format
 * @param isLargeText - Whether the text is large (14pt bold or 18pt regular)
 * @returns Object with contrast ratio and whether it passes AA and AAA levels
 */
export const checkContrast = (
  foregroundColor: string,
  backgroundColor: string,
  isLargeText = false,
): { ratio: number; passesAA: boolean; passesAAA: boolean } => {
  // Convert color to RGB
  const getRgb = (color: string): number[] => {
    // Handle hex
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b];
    }

    // Handle rgb/rgba
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbMatch) {
      return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)];
    }

    // Default to black if format not recognized
    return [0, 0, 0];
  };

  // Calculate relative luminance
  const getLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map((c) => {
      const channel = c / 255;
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const foregroundRgb = getRgb(foregroundColor);
  const backgroundRgb = getRgb(backgroundColor);

  const foregroundLuminance = getLuminance(foregroundRgb);
  const backgroundLuminance = getLuminance(backgroundRgb);

  // Calculate contrast ratio
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  // Check against WCAG criteria
  const passesAA = isLargeText ? ratio >= 3 : ratio >= 4.5;
  const passesAAA = isLargeText ? ratio >= 4.5 : ratio >= 7;

  return { ratio, passesAA, passesAAA };
};

/**
 * Checks if a component's tabindex follows best practices
 *
 * @param element - Element to check
 * @returns Object with analysis and suggestions
 */
export const checkTabindex = (
  element: HTMLElement,
): { valid: boolean; issue?: string; suggestion?: string } => {
  const tabindex = element.getAttribute('tabindex');

  if (!tabindex) {
    return { valid: true };
  }

  const tabindexValue = parseInt(tabindex, 10);

  if (isNaN(tabindexValue)) {
    return {
      valid: false,
      issue: 'Invalid tabindex value',
      suggestion: 'Remove the tabindex attribute or use a valid number',
    };
  }

  if (tabindexValue > 0) {
    return {
      valid: false,
      issue: 'Positive tabindex disrupts natural tab order',
      suggestion:
        'Use tabindex="0" for interactive elements or tabindex="-1" for programmatic focus',
    };
  }

  return { valid: true };
};

/**
 * Announces a message to screen readers using ARIA live regions
 *
 * @param message - Message to announce
 * @param politeness - Politeness level (polite or assertive)
 */
export const announceToScreenReader = (
  message: string,
  politeness: 'polite' | 'assertive' = 'polite',
): void => {
  let liveRegion = document.getElementById(`a11y-announce-${politeness}`);

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `a11y-announce-${politeness}`;
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  // Clear previous content and set new content
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 50);

  // Clear after a delay
  setTimeout(() => {
    liveRegion!.textContent = '';
  }, 3000);
};
