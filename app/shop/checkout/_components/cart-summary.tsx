import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { getCartService } from "@/lib/services/cart";
import { formatPriceWithCommas } from "@/lib/utils";
import { headers } from "next/headers";

export async function CartSummary() {
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
    <>
      {cart?.items?.map((item) => (
        <div key={item.product._id} className="flex justify-between text-sm">
          <span>{item.product.title}</span>
          <span>{formatPriceWithCommas(item.product.price)}</span>
        </div>
      ))}
      <Separator />
      <div className="flex justify-between font-bold">
        <span>مبلغ نهایی</span>
        <span>{formatPriceWithCommas(total) || 0}</span>
      </div>
      <Button size="lg" className="w-full mt-4">
        پرداخت نهایی
      </Button>
    </>
  );
}
