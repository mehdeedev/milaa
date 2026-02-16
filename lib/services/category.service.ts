import { Category } from "@/lib/models/Category";
import { CategoryDataTable } from "@/lib/types/category.type";

export async function getCategoryListService(): Promise<
  CategoryDataTable[]
> {
  const categories = await Category.find().select("title slug").lean();
  return categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
}
