import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import DarkModeBtn from "./DarkModeBtn";
export default function MobileHeader() {
  return (
    <header className="bg-white md:hidden flex px-4 py-1 justify-between items-center dark:bg-[#1e1e1e]">
      <div className="h-7 w-7 relative flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="RoboCar Logo"
          fill
          sizes="28px"
          className="dark:invert dark:brightness-200 object-contain"
          priority
        />
      </div>
      <span
        className={`text-center text-2xl flex justify-center items-center  ml-7 font-LuckiestGuy`}
      >
        RoboCar
      </span>
      <div className="flex gap-1 ">
        <DarkModeBtn />
        <SidebarTrigger className="mt-[1px] h-9" />
      </div>
    </header>
  );
}
