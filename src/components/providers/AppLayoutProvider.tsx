"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import Navbar from "@/components/shared/Navbar";

export function AppLayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  if (isAuthPage) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full px-10">
        <Navbar />
        <div className="w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
