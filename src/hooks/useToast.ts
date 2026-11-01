import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_TOAST_DURATION_MS = 3000;

export function useToast(durationMs = DEFAULT_TOAST_DURATION_MS) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutId = useRef<number | null>(null);

  const clearTimeoutIfActive = useCallback(() => {
    if (timeoutId.current !== null) {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearTimeoutIfActive();
    setMessage(null);
  }, [clearTimeoutIfActive]);

  const show = useCallback((nextMessage: string) => {
    clearTimeoutIfActive();
    setMessage(nextMessage);
    timeoutId.current = window.setTimeout(dismiss, durationMs);
  }, [clearTimeoutIfActive, dismiss, durationMs]);

  useEffect(() => clearTimeoutIfActive, [clearTimeoutIfActive]);

  return { message, show, dismiss };
}
