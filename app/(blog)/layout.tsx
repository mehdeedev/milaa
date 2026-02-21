import { SiteFooter, SiteHeader } from "@/app/shop/_components";
import { ShopSidebar } from "@/components/shop-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <ShopSidebar side="left" />
      <SiteHeader />
      {children}
      <SiteFooter />
      </div>
    </SidebarProvider>
  );
}
