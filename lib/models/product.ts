import mongoose, { Schema, model, models, Types } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";


import { Document } from "mongoose";

/* ---------- Sub Types ---------- */

export interface ProductImage {
  url: string;
  isMain: boolean;
  alt?: string;
}

export interface ProductFeature {
  key: string;
  value: string;
}

export type DimensionUnit = "cm" | "mm" | "inch";

export interface ProductDimension {
  width: number;
  height: number;
  unit: DimensionUnit;
}

/* ---------- Main Product Type ---------- */

export type ProductType = "digital" | "physical";

export type StockStatus = "in_stock" | "out_of_stock" | "preorder";

export interface IProduct extends Document {
  _id: Types.ObjectId;

  title: string;
  slug: string;

  description: string;
  text?: string;

  productType: ProductType;

  price: number;
  discountPrice?: number;

  category: Types.ObjectId;

  images: ProductImage[];

  stockStatus: StockStatus;

  features?: ProductFeature[];

  pageNumbers?: number;
  dimensions?: ProductDimension;

  format?: string;
  size?: string;

  isDraft: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/* ---------- Sub Schemas ---------- */

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
    alt: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const FeatureSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const DimensionSchema = new Schema(
  {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["cm", "mm", "inch"],
      required: true,
    },
  },
  { _id: false },
);

/* ---------- Main Schema ---------- */

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 120,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    text: {
      type: String,
    },

    productType: {
      type: String,
      enum: ["digital", "physical"],
      default: "digital",
    },

    /* ---------- Pricing ---------- */

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
    },

    /* ---------- Category ---------- */

    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    /* ---------- Images ---------- */

    images: {
      type: [ImageSchema],
      required: true,
    },

    /* ---------- Stock ---------- */

    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock", "preorder"],
      default: "in_stock",
    },

    /* ---------- Optional Product Data ---------- */

    features: {
      type: [FeatureSchema],
    },

    pageNumbers: {
      type: Number,
      min: 1,
    },

    dimensions: {
      type: DimensionSchema,
    },

    format: {
      type: String,
      trim: true,
    },

    size: {
      type: String,
      trim: true,
    },

    /* ---------- Draft ---------- */

    isDraft: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.virtual('mainImage').get(function() {
  return this.images?.find(img => img.isMain) || { url: "", alt: "" };
});

// ProductSchema.set("toObject", { virtuals: true });
// ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.plugin(mongooseLeanVirtuals);



/* ---------- Model Export ---------- */

const Product =
  models.Product || model("Product", ProductSchema);

export default Product;
