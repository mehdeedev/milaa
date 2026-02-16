"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItemData } from "@/lib/types/cart.type";
import { useCartStore } from "@/store/cart.store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useTransition } from "react";

export function CartCounter({ item }: { item: CartItemData }) {
  const { reduceCart, addToCart } = useCart();
  const { add, minus } = useCartStore();
  const [reduceLoading, reduceTransition] = useTransition();
  const [increaseLoading, increaseTransition] = useTransition();

  const handleReduce = () => {
    reduceTransition(async () => {
      await reduceCart(item.product._id);
      minus();
    });
  };

  const handleAdd = () => {
    increaseTransition(async () => {
      await addToCart(item.product._id, 1, true);
      add(1);
    });
  };

  return (
    <div className="flex items-center rounded-md">
      <Button size={"icon-sm"} variant={"secondary"} disabled={increaseLoading} onClick={handleAdd}>
        <PlusIcon />
      </Button>
      <div className="w-12 flex items-center justify-center">
        {item.quantity}
      </div>
      <Button
        size={"icon-sm"}
        variant={"secondary"}
        disabled={reduceLoading}
        onClick={handleReduce}
      >
        <MinusIcon />
      </Button>
    </div>
  );
}
