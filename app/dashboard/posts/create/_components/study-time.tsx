import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreatePostInput } from "@/lib/schema/post.schema";
import { Controller, useFormContext } from "react-hook-form";

export function StudyTime() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreatePostInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>مدت زمان مطالعه</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          control={control}
          name="studyTime"
          render={() => (
            <Field>
              <FieldLabel>مدت زمان حدودی مطالعه (دقیقه)</FieldLabel>
              <Input
                {...register("studyTime")}
                placeholder="مثال: ۱۰"
              />
              <FieldError>{errors.studyTime?.message}</FieldError>
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
}
