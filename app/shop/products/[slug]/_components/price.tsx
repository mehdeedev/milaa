import { Badge } from "@/components/ui/badge";
import { ProductData } from "@/lib/types/product.type";
import { formatPriceWithCommas } from "@/lib/utils";

export function Price({ product }: { product: ProductData }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl font-bold">
        {formatPriceWithCommas(product?.price || 0)}
      </span>
      <span>تومان</span>
      <Badge variant="secondary">امکان دانلود</Badge>
    </div>
  );
}
