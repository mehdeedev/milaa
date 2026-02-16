"use server";

import { createOrderService } from "@/lib/services/order.service";
import { PaymentMethod } from "@/lib/types/order.type";

export async function createOrderAction(input: {
  customer: {
    fullName: string;
    address: string;
    phone: string;
    postalCode?: string;
  };
  paymentMethod: PaymentMethod;
}) {
  const userId = "USER_ID_FROM_SESSION";

  const order = await createOrderService({
    userId,
    customer: input.customer,
    paymentMethod: input.paymentMethod,
  });

  return { orderId: order._id.toString() };
}
