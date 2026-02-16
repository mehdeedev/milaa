"use server";

import {
  CreateProductFormInput,
  productFormSchema,
} from "@/lib/validations/product.validation";
import product from "@/lib/models/product";
import { ActionResultType, FormErrors } from "@/lib/types/general.type";
import { ProductData, ProductDataForList } from "@/lib/types/product.type";
import {
  getLatestProductsService,
  getProductBySlugService,
} from "@/lib/services/product.service";
type InsertProductActionResponse =
  | ActionResultType<null>
  | {
      success: false;
      errors: FormErrors<typeof productFormSchema>;
      errorMessage?: never;
    };

export async function insertProductAction(
  payload: CreateProductFormInput,
): Promise<InsertProductActionResponse> {
  const validatedFields = productFormSchema.safeParse({
    ...payload,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await product.create({
    ...validatedFields.data,
  });

  return { success: true, data: null };
}

export async function getLatestProductsAction(): Promise<{
  success: boolean;
  list: ProductDataForList[] | null;
}> {
  try {
    const list = await getLatestProductsService();

    return {
      success: true,
      list,
    };
  } catch {
    return {
      success: false,
      list: null,
    };
  }
}

export async function getProductBySlugAction(slug: string): Promise<{
  success: boolean;
  item: ProductData | null;
}> {
  try {
    const item = await getProductBySlugService(slug);
    return {
      success: true,
      item,
    };
  } catch (err) {
    return {
      success: false,
      item: null,
    };
  }
}
