import { ProductData } from "@/lib/types/product.type";

export function Description({ product }: { product: ProductData }) {
  return <p className="text-muted-foreground leading-7">{product?.description}</p>;
}
