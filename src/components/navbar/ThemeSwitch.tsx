import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <>
      <p>Current theme: {resolvedTheme}</p>
      <button
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      >
        <span>Toggle Theme</span>
      </button>
    </>
  );
}