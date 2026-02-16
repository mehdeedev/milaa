import { CartSummary } from "@/app/shop/checkout/_components/cart-summary";
import { CheckoutForm } from "@/app/shop/checkout/_components/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">تسویه حساب</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form */}
        <CheckoutForm />

        {/* Summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>خلاصه سفارش</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CartSummary />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
