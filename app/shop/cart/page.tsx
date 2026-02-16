import { CartCounter } from "@/app/shop/cart/_components/cartCounter";
import { CartDelete } from "@/app/shop/cart/_components/cartDelete";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { getCartService } from "@/lib/services/cart";
import { formatPriceWithCommas } from "@/lib/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let user;
  if (!session) {
    user = await auth.api.signInAnonymous();
  }
  user = session?.user;

  const cart = await getCartService(user?.id || "");

  const total = cart.items.reduce(
    (sum: number, i) => sum + i.product.price * i.quantity,
    0,
  );


  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-32 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>

      <div className="space-y-4">
        {cart?.items?.length ? (
          cart?.items?.map((item, i) => (
            <div key={item.product._id} className="flex flex-col gap-4">
              <div className="flex items-stretch gap-4 w-full">
                <div className="w-20 h-20 relative shrink-0">
                  <Image
                    src={process.env.CDN_URL + "/" + item.product.mainImage.url}
                    alt={item.product.mainImage.alt}
                    layout="fill"
                    className="object-cover w-full object-center"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex items-start justify-between w-full gap-4">
                    <div className="text-sm text-gray-600">
                      {item.product.title}
                    </div>
                    <CartDelete item={item} />
                    
                  </div>

                  <div className="font-bold text-lg">
                    {formatPriceWithCommas(item.product.price)}{" "}
                    <span className="font-normal text-sm">تومان</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <CartCounter item={item} />
              </div>

              {i < cart?.items?.length - 1 ? <Separator className="bg-gray-100" /> : ""}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
        )}
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">مبلغ قابل پرداخت</p>
            <p className="text-xl font-bold">{formatPriceWithCommas(total) || 0} <span className="font-normal text-sm">تومان</span></p>
          </div>
          <Link href="/shop/checkout">
            <Button size="lg">ثبت مشخصات و پرداخت</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
