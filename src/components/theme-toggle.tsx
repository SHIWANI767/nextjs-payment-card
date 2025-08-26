"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = resolvedTheme || theme; // "light" | "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="cursor-pointer transition duration-300 flex justify-center items-center
      w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 
      text-slate-700 dark:text-slate-200
      hover:bg-white/70 dark:hover:bg-slate-800/60 
      focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-slate-400 dark:focus:ring-slate-600"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {current === "dark" ? (
        // Moon icon
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.64 13a9 9 0 01-11.3 7.94A9 9 0 1012 3a9.06 9.06 0 00-1.66.15A7 7 0 1121.64 13z" />
        </svg>
      ) : (
        // Sun icon
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 4.354a1 1 0 011 1V7a1 1 0 11-2 0V5.354a1 1 0 011-1zm0 10.292a3.646 3.646 0 100-7.292 3.646 3.646 0 000 7.292zm7.071-3.646a1 1 0 01-1 1H16a1 1 0 110-2h2.071a1 1 0 011 1zM7 12a1 1 0 01-1 1H3.929a1 1 0 010-2H6a1 1 0 011 1zm9.192 4.95a1 1 0 011.414 0l1.465 1.465a1 1 0 01-1.414 1.414l-1.465-1.465a1 1 0 010-1.414zM6.343 6.343a1 1 0 011.414 0L9.222 7.808a1 1 0 01-1.414 1.414L6.343 7.757a1 1 0 010-1.414z" />
        </svg>
      )}
    </button>
  );
}
