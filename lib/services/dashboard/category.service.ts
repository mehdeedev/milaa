import { Category } from "@/lib/models/Category";
import { CategoryDataTable } from "@/lib/types/category.type";

export async function getDashboardCategoryListService(): Promise<
  CategoryDataTable[]
> {
  const categories = await Category.find().select("title slug id").lean();
  return categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
}
