import { Button } from "@/components/ui/button";
import { getLatestProductsAction } from "@/lib/actions/product.action";
import { formatPriceWithCommas } from "@/lib/utils";
import { ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function LatestProductList() {
  const { list, success } = await getLatestProductsAction();
  console.log(list);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list?.map((product) => (
          <Link
            href={`/shop/products/${product.slug}`}
            key={product._id}
            className="flex"
          >
            <div className="bg-white rounded-lg shadow p-2 text-sm flex flex-col gap-2">
              <div className="relative pt-[100%] w-full overflow-hidden rounded">
                <div className="absolute inset-0 bg-gray-300">
                  <Image
                    src={process.env.CDN_URL + "/" + product.image.url}
                    alt={product.image.alt}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-gray-700 text-justify px-1">{product.title}</div>
              <div className="flex items-center justify-between px-1">
                <Button variant={'secondary'} size={"icon"} className="text-sm">
                  <ShoppingCartIcon />
                </Button>
                <div className="font-bold text-base text-gray-600">
                  {formatPriceWithCommas(product?.price)}{" "}
                  <span className="font-medium text-xs">تومان</span>
                </div>
                
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center w-full">
        <Button size={"lg"} variant={"outline"}>
          مشاهده همه محصولات
        </Button>
      </div>
    </>
  );
}
