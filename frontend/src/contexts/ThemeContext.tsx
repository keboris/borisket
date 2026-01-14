import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ThemeContextType } from "../types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // 🔹 Initialise depuis localStorage, côté client
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // lecture initiale
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    return stored ?? "light"; // défaut light si rien
  });

  // 🔹 Applique le DOM + storage à chaque changement
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔹 Toggle ou set explicite
  const toggleTheme = (themeParam?: "light" | "dark") => {
    setTheme((prev) => themeParam ?? (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeContextProvider");
  return context;
}
