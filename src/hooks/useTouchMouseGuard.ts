import { useCallback, useEffect, useRef } from 'react';

export const useTouchMouseGuard = (delay = 400) => {
  // iOS Safari: touch 後に互換 mouse が飛ぶため、その直後の mouse を無視する
  const ignoreMouseRef = useRef(false);
  const resetTimerRef = useRef<number | null>(null);

  const startIgnoreMouseWindow = useCallback(() => {
    ignoreMouseRef.current = true;

    if (resetTimerRef.current !== null) clearTimeout(resetTimerRef.current);

    resetTimerRef.current = setTimeout(() => {
      ignoreMouseRef.current = false;
      resetTimerRef.current = null;
    }, delay);
  }, [delay]);

  const shouldIgnore = useCallback(
    (event: Event) => {
      const eventType = event.type;

      if (eventType.startsWith('touch')) {
        startIgnoreMouseWindow();

        return false;
      }

      return eventType.startsWith('mouse') && ignoreMouseRef.current;
    },
    [startIgnoreMouseWindow],
  );

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return { shouldIgnore };
};
