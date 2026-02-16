import mongoose, { Schema, Document, Types } from "mongoose";

export type PaymentMethod = "zarinpal" | "idpay" | "bank";
export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export interface IOrderItem {
  product: Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export interface IOrder extends Document {
  userId: string;

  items: IOrderItem[];

  subtotal: number;
  discount: number;
  total: number;

  customer: {
    fullName: string;
    address: string;
    phone: string;
    postalCode?: string;
  };

  payment: {
    method: PaymentMethod;
    status: OrderStatus;
    authority?: string; // payment gateway ref
  };

  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },

    items: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },

    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },

    customer: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      postalCode: String,
    },

    payment: {
      method: {
        type: String,
        enum: ["zarinpal", "idpay", "bank"],
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "cancelled"],
        default: "pending",
      },
      authority: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
