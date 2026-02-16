"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createOrderAction } from "@/lib/actions/checkout.action";
import {
  CheckoutFormValues,
  checkoutSchema,
} from "@/lib/validations/checkout.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export function CheckoutForm() {
  const [pending, startTransition] = useTransition();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "zarinpal",
      phone: "",
    },
  });

  function onSubmit(values: CheckoutFormValues) {
    startTransition(async () => {
      await createOrderAction({
        customer: {
          fullName: values.fullName,
          address: values.address,
          phone: values.phone,
          postalCode: values.postalCode,
        },
        paymentMethod: values.paymentMethod,
      });

      // TODO: redirect to payment gateway
    });
  }

  return (
    <div className="md:col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات خریدار</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fullName">نام ‌و‌ نام‌خانوادگی</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="fullName"
                  placeholder="علیرضا اکبری"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address">آدرس</FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="address"
                  placeholder="آدرس کامل خود را بنویسید"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">شماره موبایل</FieldLabel>
                  <PhoneInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="phone"
                    placeholder="09********"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="postalCode">
                    کد پستی (اختیاری)
                  </FieldLabel>
                  <PhoneInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="postalCode"
                    placeholder="کد پستی ده رقمی"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>کد تخفیف</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input placeholder="کد تخفیف" />
          <Button variant="outline">اعمال</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>روش پرداخت</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="zarinpal" className="space-y-3">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="zarinpal" />
              <Label>زرین‌پال</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="idpay" />
              <Label>آی‌دی‌پی</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="bank" />
              <Label>درگاه مستقیم بانکی</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
