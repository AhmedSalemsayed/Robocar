import React, { Suspense } from "react";
// import Notifications from "./Notifications";
import WelcomeHeader from "./WelcomeHeader";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DarkModeBtn from "./DarkModeBtn";
import { User2Icon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white w-full gap-2 mt-2 dark:bg-[#1e1e1e] p-1 justify-between shadow-md rounded-sm hidden md:flex">
      <WelcomeHeader />
      <div className="flex gap-2">
        <div className="flex gap-1 text-xs items-center cursor-pointer">
          {/* <Notifications /> */}
          <DarkModeBtn />
        </div>
        <div className="h-6 w-[1px] self-center bg-slate-200 dark:bg-[#e2e2e2]" />
        <Suspense fallback={<User2Icon />}>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Suspense>
      </div>
    </header>
  );
}
