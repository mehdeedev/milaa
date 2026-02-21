import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { getDashboardCategoryListAction } from "@/lib/actions/category.action";
import { CreatePostInput } from "@/lib/schema/post.schema";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type CategoryData = {
  title: string;
  _id: string;
  slug: string;
};

export function Categories() {
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const formMethods = useFormContext<CreatePostInput>();

  useEffect(() => {
    getDashboardCategoryListAction().then((res) => {
      setCategoryList(res.list || []);
    });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>دسته‌بندی</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="categories"
          control={formMethods.control}
          render={({ field }) => (
            <FieldGroup className="max-w-sm">
              {categoryList.map((cat) => (
                <Field orientation="horizontal" key={cat._id}>
                  <Checkbox
                    id={`checkbox-${cat.slug}`}
                    name={field.name}
                    checked={field.value?.includes(cat._id) || false}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...(field.value || []), cat._id]
                        : field.value?.filter((value) => value !== cat._id);
                      field.onChange(newValue);
                      field.onBlur();
                    }}
                  />
                  <Label htmlFor={`checkbox-${cat.slug}`}>{cat.title}</Label>
                </Field>
              ))}
            </FieldGroup>
          )}
        />

        {/* <FieldError>{errors.categories?.message}</FieldError> */}
      </CardContent>
    </Card>
  );
}
