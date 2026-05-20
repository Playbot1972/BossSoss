"use client";

import { ReactNode, useEffect, useState } from "react";

const themeStorageKey = "boss-soss-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    const initialTheme = storedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<"light" | "dark">).detail;

      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem(themeStorageKey, nextTheme);
    };

    window.addEventListener("boss-soss-theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("boss-soss-theme-change", handleThemeChange);
    };
  }, []);

  return <>{children}</>;
}

export const getCurrentTheme = () =>
  typeof document === "undefined"
    ? "light"
    : document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";
