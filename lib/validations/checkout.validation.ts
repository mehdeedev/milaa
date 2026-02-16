import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی الزامی است"),
  address: z.string().min(10, "آدرس را کامل وارد کنید"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(["zarinpal", "idpay", "bank"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
