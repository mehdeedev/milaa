'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { CreatePostInput } from "@/lib/schema/post.schema";
import { Controller, useFormContext } from "react-hook-form";

export function Author() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreatePostInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>نویسنده</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          control={control}
          name="author"
          render={() => (
            <Field>
              <FieldLabel>نام نویسنده</FieldLabel>

              <FieldError>{errors.author?.message}</FieldError>
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
}
