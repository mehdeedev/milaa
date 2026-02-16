"use client";
import { Counter } from "@/app/shop/products/[slug]/_components/counter";
import { StickyBottom, StickyBottomHandle } from "@/app/shop/products/[slug]/_components/sticky-bottom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartStore } from "@/store/cart.store";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function ButtonCounter({ productId }: { productId: string }) {
  const ref = useRef<StickyBottomHandle>(null);
  const [value, setValue] = useState(1);
  const { addToCart: addToCartService } = useCart();
  const { add } = useCartStore();
  const [loading, startTransition] = useTransition();

  const onAdd = () => {
    startTransition(async () => {
      await addToCartService(productId, value);
       toast.success('محصول با موفقیت به سبد خرید اضافه شد.', {
        style: {
          background: 'green',
          color: 'white'
        },
        position: 'bottom-center'

      })
      add(value);
      setTimeout(() => {
        ref.current?.showStickyBottom();
      }, 1000);
    });
  };

  return (
    <>
    <div className="flex gap-3">
      <Counter value={value} setValue={setValue} />
      <Button size="lg" className="flex-1" onClick={onAdd} disabled={loading}>
        افزودن به سبد خرید
      </Button>
    </div>

    <StickyBottom ref={ref} />
    </>
  );
}
