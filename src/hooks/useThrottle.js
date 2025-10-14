import { useRef, useCallback } from 'react';

// useThrottle returns a throttled version of the callback that can be
// called frequently but will only invoke the original at most once per wait ms.
export default function useThrottle(fn, wait = 200) {
  const lastRef = useRef(0);

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRef.current >= wait) {
      lastRef.current = now;
      fn(...args);
    }
  }, [fn, wait]);
}
