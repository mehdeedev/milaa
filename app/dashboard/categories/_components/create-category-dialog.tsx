"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { insertCategoryAction } from "@/lib/actions/category.action";
import { categoryFormSchema } from "@/lib/validations/category.validation";

type CreateCategoryDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type FormValues = z.infer<typeof categoryFormSchema>;

export function CreateCategoryDialog({
  open,
  setOpen,
}: CreateCategoryDialogProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const result = await insertCategoryAction(formData);

    if (result?.success) {
      reset();
      setOpen(false);
      return;
    }

    // Map server-side Zod errors → react-hook-form
    if (result && "errors" in result) {
      Object.entries(result.errors).forEach(([field, messages]) => {
        if (messages?.length) {
          setError(field as keyof FormValues, {
            message: messages[0],
          });
        }
      });
    }
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>افزودن دسته‌بندی</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <Label htmlFor="title">عنوان</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="slug">اسلاگ</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && (
                <p className="text-sm text-red-500">
                  {errors.slug.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                لغو
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
