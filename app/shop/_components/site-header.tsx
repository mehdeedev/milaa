"use client";

import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cart.store";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function SiteHeader() {
  const { count, setCount } = useCartStore();
  const { getCartCount } = useCart();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchCartCount = async () => {
      const result = await getCartCount();
      setCount(result || 0);
    };
    fetchCartCount();
  }, [session]);

  return (
    <header className="bg-white flex items-center justify-center shadow shadow-gray-150 ">
      <div className="w-6xl max-w-full flex px-5 items-center justify-between">
        <Image alt="logo" src={"/milaaplan-logo.png"} width={80} height={80} />

        <div className="flex items-center text-gray-700 gap-10 lg:gap-15">
          <nav className="items-center gap-15 hidden lg:flex">
            <div className="text-sm">آموزش توسعه فردی</div>
            <div className="text-sm">جعبه ابزار</div>
            <div className="text-sm">کسب مهارت</div>
            <div className="text-sm">درباره ما</div>
          </nav>
          <Link href={"/shop/cart"}>
            <div className="relative w-fit">
              <ShoppingBagIcon className="size-5" />
              {count > 0 ? (
                <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">
                  {count}
                </Badge>
              ) : (
                ""
              )}
            </div>
          </Link>
          <div className="lg:hidden">
            <MenuIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
