import { ProductDataForCart } from "@/lib/types/product.type";

export type CartItemData = {
  product: ProductDataForCart;
  quantity: number;
};

export type CartData = {
  _id: string;
  userId: string;
  items: CartItemData[];
};
