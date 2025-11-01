import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "./ui/sidebar";

type SidebarNavLinkProps = {
  url: string;
  icon: any;
  title: string;
};

export const SidebarNavLink = ({ item }: { item: SidebarNavLinkProps }) => {
  const pathname = usePathname();
  return (
    <SidebarMenuButton asChild>
      <Link
        href={item.url}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out",
          pathname.startsWith(item.url)
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
};
