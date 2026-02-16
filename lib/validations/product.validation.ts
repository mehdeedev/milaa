import { z } from "zod";

/* ---------- helpers ---------- */

// MongoDB ObjectId validation
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// price schema (stored as number in backend)
const priceSchema = z
  .number({
    message: "قیمت الزامی است",
  })
  .nonnegative({ message: "قیمت نمی‌تواند منفی باشد" });


// dynamic product feature schema
const featureSchema = z.object({
  key: z.string().min(1), // e.g. "size", "format", "pages"
  value: z.string().min(1), // e.g. "A4", "PDF", "120"
});

/* ---------- main schema ---------- */

export const productFormSchema = z
  .object({
    title: z.string().min(1, "عنوان الزامی است").max(120),

    slug: z
      .string()
      .min(1, { message: "نامک الزامی است" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "فرمت نامک نادرست است",
      }),

    description: z
      .string()
      .min(1, { message: "توضیحات الزامی است" })
      .min(10, { message: "توضیحات باید حداقل ۱۰ کاراکتر باشد" }),

    productType: z.enum(["digital", "physical"]).optional(),

    text: z.string().optional(), // long content / markdown / html

    price: priceSchema,

    discountPrice: priceSchema.optional(),

    category: objectIdSchema, // foreign key to Category

    isDraft: z.boolean().default(false),

    stockStatus: z.enum(["in_stock", "out_of_stock", "preorder"]),

    features: z.array(featureSchema).optional(),

    images: z.array(z.object({
      url: z.string().optional(),
      isMain: z.boolean().optional().default(false),
      alt: z.string().optional(),
    })).min(1),

    pageNumbers: z.number().int().positive().optional(),
    dimensions: z
      .object({
        width: z.number().positive(),
        height: z.number().positive(),
        unit: z.enum(["cm", "mm", "inch"]),
      })
      .optional(),

    format: z.string().optional(), // PDF, EPUB, Hardcover, etc
    size: z.string().optional(), // A4, A5, etc
  })
  .superRefine((data, ctx) => {
    /* ---------- discount logic ---------- */
    if (data.discountPrice !== undefined && data.discountPrice >= data.price) {
      ctx.addIssue({
        path: ["discountPrice"],
        message: "قیمت با تخفیف باید کمتر از قیمت اصلی باشد",
        code: "custom",
      });
    }

  });

export const createProductSchema = productFormSchema.safeExtend({
  images: z.array(
    z.object({
    url: z.string().url(),
    isMain: z.boolean().optional().default(false),
    alt: z.string().optional(),
  })
  ).min(1),
});

/* ---------- inferred type ---------- */
export type ProductFormInput = z.input<typeof productFormSchema>;
export type CreateProductFormInput = z.input<typeof createProductSchema>;
