import { ProductData } from "@/lib/types/product.type";

export function Title({ product }: { product: ProductData }) {
  return <h1 className="text-3xl font-bold leading-12">{product.title}</h1>;
}
