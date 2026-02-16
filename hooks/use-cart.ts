"use client";

import { authClient } from "@/lib/auth-client";
import {
  addToCartService,
  getCartCountService,
  getCartService,
  removeFromCartService,
} from "@/lib/services/cart";
import { CartItemData } from "@/lib/types/cart.type";

export function useCart() {
  const { data: session } = authClient.useSession();

  const addToCart = async (
    productId: string,
    quantity: number,
    revalidate?: boolean
  ): Promise<{ success: boolean; message?: string }> => {
    let user;

    if (!session?.user) {
      user = await authClient.signIn.anonymous();
    }

    await addToCartService({
      productId,
      quantity,
      userId: session?.user?.id || user?.data?.user?.id || "anonymous",
      revalidate
    });

  

    return {
      success: true,
    };
  };

  const reduceCart = async (productId: string, quantity?: number) => {
    let user;

    if (!session?.user) {
      user = await authClient.signIn.anonymous();
    }

    await removeFromCartService({
      productId,
      userId: session?.user?.id || user?.data?.user?.id || "anonymous",
      quantity
    });
    
  };

  const getCart = async (): Promise<{
    success: boolean;
    list?: CartItemData[];
  }> => {
    if (!session?.user?.id) {
      return {
        success: false,
      };
    }

    const list = await getCartService(session.user.id);
    return {
      success: true,
      list: list.items,
    };
  };

  const getCartCount = async (): Promise<number | null> => {
    if (!session?.user?.id) {
      return null;
    }

    const cartCount = await getCartCountService(session.user.id);
    return cartCount;
  };

  return { addToCart, getCart, getCartCount, reduceCart };
}
