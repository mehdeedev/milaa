'use server';

import { connectDB } from "@/lib/db/mongoose";
import { Category } from "@/lib/models/Category";
import { getCategoryListService } from "@/lib/services/category.service";
import { getDashboardCategoryListService } from "@/lib/services/dashboard/category.service";
import { CategoryDataTable } from "@/lib/types/category.type";
import { FormActionResult } from "@/lib/types/forms.type";
import { CategoryFormInput, categoryFormSchema } from "@/lib/validations/category.validation";
import { revalidatePath } from "next/cache";

export async function insertCategoryAction(
  formData: FormData,
): Promise<FormActionResult<CategoryFormInput>> {
  const validatedFields = categoryFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    connectDB();
    await Category.create({
      ...validatedFields.data,
    });
    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    debugger;
    return { success: false, message: "Error" };
  }
}

export async function getDashboardCategoryListAction(): Promise<{
  success: boolean;
  list: CategoryDataTable[] | null;
}> {
  try {
    connectDB();

    const list = await getDashboardCategoryListService();
    return {
      success: true,
      list,
    };
  } catch (err) {
    return {
      success: false,
      list: null,
    };
  }
}

export async function getCategoryListAction(): Promise<{
  success: boolean;
  list: CategoryDataTable[] | null;
}> {
  try {
    connectDB();

    const list = await getCategoryListService();
    return {
      success: true,
      list,
    };
  } catch (err) {
    return {
      success: false,
      list: null,
    };
  }
}

