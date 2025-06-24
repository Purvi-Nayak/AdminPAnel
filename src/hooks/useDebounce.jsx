import React, { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedSearch, setDebouncedSearch] = useState(value);

  useEffect(() => {
    const handlerDebouncedSearch = setTimeout(() => {
      setDebouncedSearch(value);
    }, delay);

    return () => clearTimeout(handlerDebouncedSearch);
  }, [value, delay]);

  return debouncedSearch;
};

export default useDebounce;
