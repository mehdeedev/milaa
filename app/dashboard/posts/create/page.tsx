"use client";

import {
  Author,
  Categories,
  FeaturedImage,
  PostEditor,
  PostInformation,
  StudyTime,
} from "@/app/dashboard/posts/create/_components";
import { Button } from "@/components/ui/button";
import { CreatePostInput, createPostSchema } from "@/lib/schema/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

export default function CreatePost() {
  const formMethods = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (values: CreatePostInput) => {
    debugger;
  };

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ArrowRightIcon />
            </Button>
            <h1 className="text-2xl font-bold">افزودن نوشته جدید</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost">
              انصراف
            </Button>
            <Button type="submit" variant="outline">
              پیش‌نویس
            </Button>
            <Button type="submit">انتشار</Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-start">
          {/* RIGHT */}
          <div className="col-span-3 flex flex-col gap-4">
            <PostInformation />
            <PostEditor />

          </div>

          {/* LEFT */}
          <div className="flex flex-col gap-4">
            <FeaturedImage />
            <Categories />
            <Author />
            <StudyTime />

          </div>
        </div>
      </form>
    </FormProvider>
  );
}
