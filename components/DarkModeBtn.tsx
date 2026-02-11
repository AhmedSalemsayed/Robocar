"use client";
import { Moon } from "lucide-react";
import { ImSun } from "react-icons/im";
import { useDarkMode } from "usehooks-ts";

export default function DarkModeBtn() {
  const { isDarkMode, toggle } = useDarkMode();

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
