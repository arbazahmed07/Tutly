import * as React from "react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"

export function ModeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme")
      if (theme) return theme === "dark"
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return true
  })

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }
  return (
    <button onClick={toggleTheme} className="hover:bg-muted rounded-full p-0 h-10 w-10 flex items-center justify-center">
      {isDark ? (
        <MdOutlineLightMode className="h-5 w-5" />
      ) : (
        <MdOutlineDarkMode className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
