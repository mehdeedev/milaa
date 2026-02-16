import { ProductData } from "@/lib/types/product.type";

export function Content({ product }: { product: ProductData }) {
  return <div className="content leading-9" dangerouslySetInnerHTML={{ __html: product.text }} />;
}
