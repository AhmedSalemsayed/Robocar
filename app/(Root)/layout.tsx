import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cookies } from "next/headers";
import MobileHeader from "@/components/MobileHeader";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider
      className="flex flex-col md:flex-row bg-[#fafbfd] dark:bg-[#121212] "
      defaultOpen={defaultOpen}
    >
      <AppSidebar />
      {/* <MobileHeader /> */}
      <main className="bg-[#fafbfd] dark:bg-[#121212] relative w-full max-w-[1440px] flex-1 min-w-0 h-full min-h-dvh flex flex-col justify-between gap-4 p-1 font-Roboto overflow-auto">
        <Header />
        {children}
        <Toaster richColors />
      </main>
    </SidebarProvider>
  );
}
