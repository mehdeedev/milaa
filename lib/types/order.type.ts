import { Types } from "mongoose";

export type PaymentMethod = "zarinpal" | "idpay" | "bank";

export interface OrderItemInput {
  product: Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CreateOrderInput {
  userId: string;
  customer: {
    fullName: string;
    address: string;
    phone: string;
    postalCode?: string;
  };
  paymentMethod: PaymentMethod;
}
