import Cart, { ICart, ICartItem } from "@/lib/models/cart";
import Order from "@/lib/models/order";
import { IProduct } from "@/lib/models/product";
import { CreateOrderInput, OrderItemInput } from "@/lib/types/order.type";
import mongoose, { Types } from "mongoose";


export async function createOrderService({
  userId,
  customer,
  paymentMethod,
}: CreateOrderInput) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = (await Cart.findOne({ userId })
      .populate("items.product")
      .session(session)) as ICart | null;

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const orderItems: OrderItemInput[] = cart.items.map(
      (item: ICartItem) => {
        if (!(item.product instanceof Types.ObjectId)) {
          const product = item.product as IProduct;

          const total = product.price * item.quantity;

          return {
            product: product._id,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
            total,
          };
        }

        // This should never happen if populate is correct
        throw new Error("Product not populated");
      }
    );

    const subtotal = orderItems.reduce(
      (sum: number, item) => sum + item.total,
      0
    );

    const discount = 0;
    const total = subtotal - discount;

    const [order] = await Order.create(
      [
        {
          userId,
          items: orderItems,
          subtotal,
          discount,
          total,
          customer,
          payment: {
            method: paymentMethod,
            status: "pending",
          },
        },
      ],
      { session }
    );

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
