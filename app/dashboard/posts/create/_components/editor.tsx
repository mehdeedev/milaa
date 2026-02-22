'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePostInput } from "@/lib/schema/post.schema";
import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";

const TextEditor = dynamic(() => import("@/components/text-editor"), {
  ssr: false,
});

export function PostEditor() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreatePostInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>متن نوشته</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextEditor content={field.value ?? ""} onChange={field.onChange} />
          )}
        />
        {errors.content?.message}
      </CardContent>
    </Card>
  );
}
