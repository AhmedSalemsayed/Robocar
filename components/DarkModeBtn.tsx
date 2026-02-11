"use client";
import { Moon } from "lucide-react";
import { ImSun } from "react-icons/im";
import { useDarkMode } from "usehooks-ts";
import { useEffect, useState } from "react";

export default function DarkModeBtn() {
  const { isDarkMode, toggle } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <button
        aria-label="Toggle dark mode"
        className="hover:bg-slate-200 rounded-full dark:hover:bg-[#2a2a2a] p-1 transition-colors"
      >
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle dark mode"
      className="hover:bg-slate-200 rounded-full dark:hover:bg-[#2a2a2a] p-1 transition-colors"
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        toggle();
      }}
    >
      {isDarkMode ? (
        <ImSun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
