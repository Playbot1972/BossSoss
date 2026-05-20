"use client";

import { useEffect, useState } from "react";
import { getCurrentTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    window.dispatchEvent(
      new CustomEvent("boss-soss-theme-change", { detail: nextTheme })
    );
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
