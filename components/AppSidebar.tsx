"use client";
import { Car, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import NavLink from "./NavLink";
import { TooltipProvider } from "./ui/tooltip";

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="bg-[#fafbfd] dark:bg-[#121212]"
    >
      <SidebarHeader className="flex flex-row gap-2 items-center overflow-hidden pt-[15px]">
        <div className="relative w-6 h-6 md:h-7  md:w-7  flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            fill
            className="dark:invert dark:brightness-200"
          />
        </div>
        {state === "expanded" && (
          <span className="font-LuckiestGuy pointer-events-none dark:text-white tracking-wide text-black text-2xl md:text-2xl ml-3 md:ml-3">
            RoboCar
          </span>
        )}
        {isMobile && (
          <span className="font-LuckiestGuy pointer-events-none dark:text-white tracking-wide text-black text-2xl md:text-2xl ml-3 md:ml-3">
            RoboCar
          </span>
        )}
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-start pt-4">
        <TooltipProvider>
          <NavLink icon={<Home />} title="Dashboard" href="/" exact={true} />
          <NavLink icon={<Car />} title="Cars" href="/cars" />
        </TooltipProvider>
      </SidebarContent>

      <SidebarTrigger className="ml-2 rounded-none text-sidebar-foreground hover:bg-[--btn-hover-bg-color]  hover:text-white transition-all m-0 p-2 w-full" />
    </Sidebar>
  );
}
