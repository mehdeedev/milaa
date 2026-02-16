import Product from "@/lib/models/product";
import { ProductData, ProductDataForList } from "@/lib/types/product.type";

export async function getLatestProductsService(): Promise<ProductDataForList[]> {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .select("title slug price createdAt")
    .select({ images: { $elemMatch: { isMain: true } } })
    .lean();

  return products.map((product) => ({
    ...product,
    _id: product._id.toString(),
    image: product.images[0],
    images: undefined
  }));
}

export async function getProductBySlugService(slug: string): Promise<ProductData> {
  const product = await Product.findOne({ slug }).lean();

  return {
    ...product,
    _id: product._id.toString()
  }
}

