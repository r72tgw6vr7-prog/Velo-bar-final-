import { useCallback, useEffect, useRef } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { getItemSafe, setItemSafe, removeItemSafe } from '@/lib/storage/localStorageSafe.ts';

interface FormAutosaveOptions {
  storageKey: string;
  debounceMs?: number;
}

/**
 * Sync form values to localStorage with a small debounce, restoring drafts on mount.
 */
export function useFormAutosave<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  { storageKey, debounceMs = 800 }: FormAutosaveOptions,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const skipNextSaveRef = useRef(false);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const stored = getItemSafe<Partial<TFieldValues>>(storageKey);

    if (stored) {
      form.reset(stored as TFieldValues, { keepDefaultValues: true });
    }

    return undefined;
  }, [form, isBrowser, storageKey]);

  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const subscription = form.watch((values) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        if (skipNextSaveRef.current) {
          skipNextSaveRef.current = false;
          return;
        }

        setItemSafe(storageKey, values);
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debounceMs, form, isBrowser, storageKey]);

  const clear = useCallback(() => {
    if (!isBrowser) {
      return;
    }

    removeItemSafe(storageKey);
    skipNextSaveRef.current = true;
  }, [isBrowser, storageKey]);

  return { clear };
}
