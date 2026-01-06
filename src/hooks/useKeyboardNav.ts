import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEventHandler,
  RefObject,
  FocusEventHandler,
} from 'react';

type KeyHandler = (event: KeyboardEvent) => void;
type FocusHandler = (event: React.FocusEvent) => void;

interface UseKeyboardNavOptions {
  /**
   * Whether the keyboard navigation is currently active
   * @default true
   */
  isActive?: boolean;
  /**
   * Callback when the Escape key is pressed
   */
  onEscape?: KeyHandler;
  /**
   * Callback when the Enter key is pressed
   */
  onEnter?: KeyHandler;
  /**
   * Callback when the Space key is pressed
   */
  onSpace?: KeyHandler;
  /**
   * Callback when the ArrowUp key is pressed
   */
  onArrowUp?: KeyHandler;
  /**
   * Callback when the ArrowDown key is pressed
   */
  onArrowDown?: KeyHandler;
  /**
   * Callback when the ArrowLeft key is pressed
   */
  onArrowLeft?: KeyHandler;
  /**
   * Callback when the ArrowRight key is pressed
   */
  onArrowRight?: KeyHandler;
  /**
   * Callback when the Tab key is pressed
   */
  onTab?: KeyHandler;
  /**
   * Callback when the Home key is pressed
   */
  onHome?: KeyHandler;
  /**
   * Callback when the End key is pressed
   */
  onEnd?: KeyHandler;
  /**
   * Callback when any key is pressed
   */
  onKeyDown?: KeyHandler;
  /**
   * Callback when the element gains focus
   */
  onFocus?: FocusHandler;
  /**
   * Callback when the element loses focus
   */
  onBlur?: FocusHandler;
}

/**
 * Hook for managing keyboard navigation and focus states
 * @param options Configuration options for keyboard navigation
 * @returns Object containing event handlers and focus state
 */
export function useKeyboardNav({
  isActive = true,
  onEscape,
  onEnter,
  onSpace,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  onHome,
  onEnd,
  onKeyDown,
  onFocus,
  onBlur,
}: UseKeyboardNavOptions = {}) {
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      // Call the appropriate handler based on the key
      switch (event.key) {
        case 'Escape':
          onEscape?.(event);
          break;
        case 'Enter':
          onEnter?.(event);
          break;
        case ' ':
          onSpace?.(event);
          break;
        case 'ArrowUp':
          onArrowUp?.(event);
          break;
        case 'ArrowDown':
          onArrowDown?.(event);
          break;
        case 'ArrowLeft':
          onArrowLeft?.(event);
          break;
        case 'ArrowRight':
          onArrowRight?.(event);
          break;
        case 'Tab':
          onTab?.(event);
          break;
        case 'Home':
          onHome?.(event);
          break;
        case 'End':
          onEnd?.(event);
          break;
        default:
          break;
      }

      // Call the user's keydown handler if provided
      onKeyDown?.(event);
    },
    [
      isActive,
      onEscape,
      onEnter,
      onSpace,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      onTab,
      onHome,
      onEnd,
      onKeyDown,
    ],
  );

  // Handle focus events
  const handleFocus = useCallback<FocusEventHandler>(
    (event) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  // Handle blur events
  const handleBlur = useCallback<FocusEventHandler>(
    (event) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  // Set up event listeners for focus management
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('focusin', handleFocus as any);
    element.addEventListener('focusout', handleBlur as any);

    return () => {
      element.removeEventListener('focusin', handleFocus as any);
      element.removeEventListener('focusout', handleBlur as any);
    };
  }, [handleFocus, handleBlur]);

  // Return the event handlers and focus state
  return {
    onKeyDown: handleKeyDown as unknown as React.KeyboardEventHandler<HTMLElement>,
    onFocus: handleFocus,
    onBlur: handleBlur,
    isFocused,
    ref: elementRef as RefObject<HTMLElement>,
  };
}

interface FocusManagementReturn {
  /**
   * Whether the element is currently focused
   */
  isFocused: boolean;
  /**
   * Focus event handler
   */
  onFocus: FocusEventHandler;
  /**
   * Blur event handler
   */
  onBlur: FocusEventHandler;
  /**
   * Ref to attach to the element
   */
  ref: RefObject<HTMLElement>;
}

/**
 * Hook for managing focus within a component
 * @returns Object containing focus state and event handlers
 */
export const useFocusManagement = (): FocusManagementReturn => {
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const handleFocus = useCallback<FocusEventHandler>((event) => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback<FocusEventHandler>((event) => {
    setIsFocused(false);
  }, []);

  return {
    isFocused,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: elementRef,
  };
};

interface ListNavigationOptions {
  /**
   * Initial selected index
   */
  initialIndex?: number;
  /**
   * Whether to wrap around when navigating past the first or last item
   */
  wrapAround?: boolean;
  /**
   * Whether to focus the selected item
   */
  autoFocus?: boolean;
}

interface ListNavigationReturn {
  /**
   * Currently selected index
   */
  selectedIndex: number;
  /**
   * Set the selected index
   */
  setSelectedIndex: (index: number) => void;
  /**
   * Key down event handler for navigation
   */
  onKeyDown: React.KeyboardEventHandler;
  /**
   * Ref for the container element
   */
  containerRef: RefObject<HTMLElement>;
}

/**
 * Hook for managing keyboard navigation in a list
 * @param itemCount Number of items in the list
 * @param onSelect Callback when an item is selected
 * @param options Configuration options
 * @returns Object containing event handlers and selected index
 */
export const useListNavigation = (
  itemCount: number,
  onSelect: (index: number) => void,
  options: ListNavigationOptions = {},
): ListNavigationReturn => {
  const { initialIndex = 0, wrapAround = true, autoFocus = false } = options;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLElement>(null);

  // Focus the selected item when it changes
  useEffect(() => {
    if (autoFocus && containerRef.current) {
      const items = containerRef.current.querySelectorAll<HTMLElement>('[role="option"]');
      if (items[selectedIndex]) {
        items[selectedIndex].focus();
      }
    }
  }, [selectedIndex, autoFocus]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback<React.KeyboardEventHandler>(
    (event) => {
      if (itemCount === 0) return;

      let newIndex = selectedIndex;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          newIndex = wrapAround
            ? (selectedIndex + 1) % itemCount
            : Math.min(selectedIndex + 1, itemCount - 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = wrapAround
            ? (selectedIndex - 1 + itemCount) % itemCount
            : Math.max(selectedIndex - 1, 0);
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = itemCount - 1;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onSelect(selectedIndex);
          return; // Don't update the selected index
        default:
          return; // Don't update the selected index for other keys
      }

      setSelectedIndex(newIndex);
    },
    [itemCount, onSelect, selectedIndex, wrapAround],
  );

  return {
    selectedIndex,
    setSelectedIndex,
    onKeyDown: handleKeyDown,
    containerRef,
  };
};
