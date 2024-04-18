import { useState, useEffect } from "react";

export default function useLocalStorageState(key:string, initialState:any) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initialState;
    return JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
