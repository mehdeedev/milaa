"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItemData } from "@/lib/types/cart.type";
import { useCartStore } from "@/store/cart.store";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";

export function CartDelete({ item }: { item: CartItemData }) {
  const { reduceCart } = useCart();
  const { minus } = useCartStore();
  const [removeLoading, removeTransition] = useTransition();

  const handleRemove = () => {
    removeTransition(async () => {
      await reduceCart(item.product._id, item.quantity);
      minus(item.quantity);
    });
  };

  return (
    <Button
      size={"icon-sm"}
      variant={"secondary"}
      onClick={handleRemove}
      disabled={removeLoading}
    >
      <TrashIcon className="text-gray-500" />
    </Button>
  );
}
