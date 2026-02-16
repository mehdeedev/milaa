"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { RefObject, useImperativeHandle, useState } from "react";

export type StickyBottomHandle = {
  showStickyBottom: () => void;
};

export function StickyBottom({
  ref,
}: {
  ref: RefObject<StickyBottomHandle | null>;
}) {
  const { count } = useCartStore();
  const [isShow, setIsShow] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      showStickyBottom() {
        setIsShow(true);
      },
    };
  }, []);

  return (
    <div
      className={`fixed transition-all duration-100 bg-white w-full left-0 flex items-center p-3 gap-4 shadow-[0_6px_13px] ${isShow ? "bottom-0" : "-bottom-20"}`}
    >
      <Link href={"/shop/cart"} className="flex-1">
        <Button size={"lg"} className="w-full">
          <ShoppingBagIcon />
          سبد خرید ({count})
        </Button>
      </Link>
      <Link href={"/shop/products"} className="flex-1">
        <Button className="w-full" variant={"ghost"}>
          بازگشت به فروشگاه
        </Button>
      </Link>
    </div>
  );
}
