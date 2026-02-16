import mongoose, { Schema } from "mongoose";

export interface ICategory {
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Category = mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
