"use server";

import { connectDB } from "@/lib/db/mongoose";
import "@/lib/models/product";
import Cart, { ICart } from "@/lib/models/cart";
import { CartData, CartItemData } from "@/lib/types/cart.type";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";


interface AddToCartInput {
  userId: string;
  productId: string;
  quantity?: number;
  revalidate?: boolean;
}

export async function addToCartService({
  userId,
  productId,
  quantity = 1,
  revalidate = false
}: AddToCartInput) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product id");
  }

  let cart: ICart | null = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
    });
  }

  const existingItem = cart?.items?.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    console.log(cart?.toObject());
    cart?.items.push({
      product: new mongoose.Types.ObjectId(productId),
      quantity,
    });
  }

  await cart?.save();
    if(revalidate) {
      revalidatePath('/shop/cart')
    }
}

interface RemoveFromCartInput {
  userId: string;
  productId: string;
  quantity?: number;
}

export async function removeFromCartService({
  userId,
  productId,
  quantity = 1,
}: RemoveFromCartInput) {
  const cart: ICart | null = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex === -1) {
    throw new Error("Product not in cart");
  }

  const item = cart.items[itemIndex];

  if (item.quantity > quantity) {
    item.quantity -= quantity;
  } else {
    // remove completely
    cart.items.splice(itemIndex, 1);
  }

  await cart.save();
  revalidatePath('/shop/cart');
}

export async function getCartService(userId: string): Promise<CartData> {
  await connectDB();

  const result = await Cart.findOne({
    userId,
  }).populate({
    path: "items.product",
    select: "title slug price images",
  }).lean({ virtuals: true });

  return {
    ...result,
    _id: result._id.toString(),
    items: result.items.map((item: CartItemData) => ({
      ...item,
      _id: undefined,
      product: {
        ...item.product,
        _id: item.product._id.toString(),
        mainImage: item.product.mainImage,
        images: undefined
      },

    })),
  };
}

export async function getCartCountService(
  userId: string,
): Promise<number | null> {
  await connectDB();

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return 0;
  }

  const totalQuantity = cart.items.reduce(
    (sum: number, item: CartItemData) => sum + item.quantity,
    0,
  );

  return totalQuantity;
}
