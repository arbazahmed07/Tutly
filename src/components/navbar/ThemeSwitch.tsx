import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
      <button
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      >
        <div
          className={`cursor-pointer rounded-full ${resolvedTheme === "light" ? "hover:bg-neutral-300" : "hover:bg-secondary-800"} p-2`}
        >
          {resolvedTheme === "light" ? (
            <MdOutlineDarkMode className="text-xl" />
          ) : (
            <MdOutlineLightMode className="text-xl" />
          )}
        </div>
      </button>
    </>
  );
}
