import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 200) => {
  const [debounced, setDebounced] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debounced;
};

export default useDebounce;
