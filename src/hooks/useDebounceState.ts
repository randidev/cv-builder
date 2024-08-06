import { useEffect, useState } from "react";

function useDebounceState<T>(
  value: T,
  delay: number
): { data: T; loading: null | boolean } {
  const [loading, setLoading] = useState<null | boolean>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);
      setDebouncedValue(value);
    }, delay);

    return () => {
      setLoading(false);
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { data: debouncedValue, loading };
}

export default useDebounceState;
