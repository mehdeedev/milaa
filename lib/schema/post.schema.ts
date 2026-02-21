import { z } from "zod";

export const postBaseSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be URL-friendly"),
  content: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  studyTime: z.number().int().positive().optional(),
  status: z.enum(["draft", "pending", "publish", "trash"]).default("draft").optional(),
  author: z.string(),
  featuredImage: z.object({
    url: z.string().url(),
    alt: z.string().optional(),
  }).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.date().optional().nullable(),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    noIndex: z.boolean().optional(),
    openGraph: z.object({
      title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional()
    }).optional(),
    twitterCard: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().url().optional()
     }).optional()
  }),
});

/* ------------------------------------------------------- */
export const createPostSchema = postBaseSchema;

export const updatePostSchema = z.object({
  ...postBaseSchema,
  id: z.string()
}).partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
/* ------------------------------------------------------- */
export const postDetailsSchema = postBaseSchema.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type PostDetails = z.infer<typeof postDetailsSchema>;
/* ------------------------------------------------------- */
export const postSummarySchema = postDetailsSchema.pick({
  _id: true,
  title: true,
  slug: true,
  excerpt: true,
  author: true,
  updatedAt: true
});