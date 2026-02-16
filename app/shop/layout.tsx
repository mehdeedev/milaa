import { SiteFooter, SiteHeader } from "@/app/shop/_components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <SiteHeader />
      {children}
      <SiteFooter />
    </>

  );
}