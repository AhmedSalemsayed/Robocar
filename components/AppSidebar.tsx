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
       <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-3xl shadow-2xl">
              <Car className="w-5 h-5 text-white" strokeWidth={2} />
       </div>
        {state === "expanded" && (
          <span className="font-LuckiestGuy pointer-events-none  tracking-wide text-black text-2xl md:text-2xl ml-3 md:ml-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400">
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
          <NavLink icon={<Home />} title="Dashboard" href="/dashboard" exact={true} />
          <NavLink icon={<Car />} title="Cars" href="/cars" />
        </TooltipProvider>
      </SidebarContent>

      <SidebarTrigger className="ml-2 rounded-none text-sidebar-foreground hover:bg-[--btn-hover-bg-color]  hover:text-white transition-all m-0 p-2 w-full" />
    </Sidebar>
  );
}
