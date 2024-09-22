import {useState, useEffect} from 'react';

type DebouncedValue = string | number;

export const useDebounce = (
  value: DebouncedValue,
  delay: number,
): DebouncedValue => {
  const [debouncedValue, setDebouncedValue] = useState<DebouncedValue>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
