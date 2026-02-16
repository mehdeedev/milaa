"use client";

import { ProductImages } from "@/app/dashboard/products/_components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupPriceInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getDashboardCategoryListAction } from "@/lib/actions/category.action";
import { insertProductAction } from "@/lib/actions/product.action";
import {
  CreateProductFormInput,
  createProductSchema,
  ProductFormInput,
  productFormSchema,
} from "@/lib/validations/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { toast } from "sonner";

const TextEditor = dynamic(() => import("@/components/text-editor"), {
  ssr: false,
});

type CategoryData = {
  title: string;
  _id: string;
  slug: string;
};

export default function CreateProduct() {
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    getDashboardCategoryListAction().then((res) => {
      setCategoryList(res.list || []);
    });
  }, []);

  const formMethods = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      stockStatus: "in_stock",
      isDraft: false,
      productType: "digital",
      images: []
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  console.log(errors, formMethods.getValues())

  const showError = (message: string) => {
    toast.error(message, {
        style: {
          background: 'red',
          color: 'white'
        }
      })
  }


  const onSubmit = async (values: ProductFormInput) => {

    const imagesInput = document.querySelector<HTMLInputElement>("#images");
    if (!imagesInput?.files?.length) {
      showError("Images are required");
      
      return;
    }

    // 1️⃣ upload images
    const fd = new FormData();
    Array.from(imagesInput.files).forEach((file) => fd.append("file", file));

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });


    if (!uploadRes.ok) {
      showError("Image upload failed");
      return;
    }

    const { data: urls } = await uploadRes.json();

    // 2️⃣ Merge urls + metadata
    const images = values.images.map((img, index) => ({
      url: urls[index],
      isMain: img.isMain,
      alt: img.alt,
    }));

    startTransition(async () => {
      const result = await insertProductAction({
        ...values,
        images,
      });

      if (!result?.success) {
        showError(result?.errorMessage || "");
        return;
      }

      formMethods.reset();

      router.push('/dashboard/products')
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ArrowRightIcon />
            </Button>
            <h1 className="text-2xl font-bold">افزودن محصول جدید</h1>
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

        <div className="grid grid-cols-3 gap-4 items-start">
          {/* RIGHT */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Product info */}
            <Card>
              <CardHeader>
                <CardTitle>مشخصات محصول</CardTitle>
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
                        {process.env.NEXT_PUBLIC_APP_URL}/products/
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      {...register("slug")}
                      placeholder="planning-notebook"
                    />
                  </InputGroup>
                  <FieldError>{errors.slug?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>توضیحات مختصر</FieldLabel>
                  <Textarea {...register("description")} />
                  <FieldError>{errors.description?.message}</FieldError>
                </Field>
              </CardContent>
            </Card>

            {/* Product Images */}
            <ProductImages />

            {/* Editor */}
            <Card>
              <CardHeader>
                <CardTitle>توضیحات تکمیلی</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => (
                    <TextEditor
                      content={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.text?.message}
              </CardContent>
            </Card>
          </div>

          {/* LEFT */}
          <div className="flex flex-col gap-4">
            {/* Price */}
            <Card>
              <CardHeader>
                <CardTitle>قیمت</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <Field>
                  <FieldLabel>قیمت محصول</FieldLabel>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <InputGroup dir="ltr">
                        <InputGroupAddon>
                          <InputGroupText>تومان</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupPriceInput
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </InputGroup>
                    )}
                  />
                  <FieldError>{errors.price?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>قیمت با تخفیف</FieldLabel>
                  <Controller
                    name="discountPrice"
                    control={control}
                    render={({ field }) => (
                      <InputGroup dir="ltr">
                        <InputGroupAddon>
                          <InputGroupText>تومان</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupPriceInput
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </InputGroup>
                    )}
                  />
                  <FieldError>{errors.discountPrice?.message}</FieldError>
                </Field>

                <Controller
                  name="stockStatus"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value === "in_stock"}
                        onCheckedChange={(v) =>
                          field.onChange(v ? "in_stock" : "out_of_stock")
                        }
                      />
                      <Label>موجود در انبار</Label>
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>دسته‌بندی</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        dir="rtl"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب دسته‌بندی" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryList.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                <FieldError>{errors.category?.message}</FieldError>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
