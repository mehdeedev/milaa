'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePostInput } from "@/lib/schema/post.schema";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";


export function PostInformation() {
      const { register, control, formState: { errors } } = useFormContext<CreatePostInput>();

    
    return (
         <Card>
              <CardHeader>
                <CardTitle>مشخصات نوشته</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <Field>
                  <FieldLabel>عنوان</FieldLabel>
                  <Input
                    {...register("title")}
                    placeholder="دفتر برنامه ریزی روزانه"
                  />
                  <FieldError>{errors.title?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>نامک</FieldLabel>
                  <InputGroup dir="ltr">
                    <InputGroupAddon>
                      <InputGroupText className="text-xs">
                        {process.env.NEXT_PUBLIC_APP_URL}/{"category"}/
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      {...register("slug")}
                      placeholder="planning-notebook"
                    />
                  </InputGroup>
                  <FieldError>{errors.slug?.message}</FieldError>
                </Field>

                {/* <Field>
                  <FieldLabel>توضیحات مختصر</FieldLabel>
                  <Textarea {...register("excerpt")} />
                  <FieldError>{errors.excerpt?.message}</FieldError>
                </Field> */}
              </CardContent>
            </Card>
    )
}