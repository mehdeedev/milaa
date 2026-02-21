// features/posts/server/actions.ts
"use server";

import { connectDB } from "@/lib/db/mongoose";
import { Post } from "@/lib/models/post";
import { createPostSchema } from "@/lib/schema/post.schema";

export async function createPost(prev: unknown, formData: FormData) {
  await connectDB();
  debugger;
  const data = createPostSchema.parse(Object.fromEntries(formData));

  const post = await Post.create({
    ...data,
    publishedAt: data.status === "publish" ? new Date() : null,
  });

  return { success: true, id: post.id };
}
