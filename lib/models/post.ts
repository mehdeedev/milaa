import mongoose, { Schema, InferSchemaType } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: { type: String, default: "" }, 
    excerpt: { type: String, default: "" }, 
    status: {
      type: String,
      enum: ["draft", "publish", "trash"],
      default: "draft",
      index: true,
    },
    studyTime: { type: Number, default: 0 },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    featuredImage: {
      url: { type: String, required: true },
      alt: { type: String, default: "" }
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    publishedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    seo: {
        metaTitle: {
            type: String,
            required: true
        },
        metaDescription: {
            type: String,
            default: ""
        },
        canonicalUrl: { type: String, default: null },
        noIndex: { type: Boolean, default: false },
        openGraph: {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            image: { type: String, default: null }
        },
        twitterCard: {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            image: { type: String, default: null }
        }
    },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.index({ slug: 1 });
postSchema.index({ status: 1, type: 1, publishedAt: -1 });
postSchema.index({ author: 1 });

export type PostDocument = InferSchemaType<typeof postSchema>;

export const Post =
  (mongoose.models.Post as mongoose.Model<PostDocument>) ||
  mongoose.model<PostDocument>("Post", postSchema);
