import { IProduct } from "@/lib/models/product";
import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId | IProduct;
  quantity: number;
}

export interface ICart extends Document {
  items: ICartItem[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    items: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1, // ✅ also important
          },
        },
      ],
      default: [], // ✅ CRITICAL
    },

    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
