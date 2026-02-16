"use server";

import { auth } from "@/lib/auth";
import { voroodSchema } from "@/lib/validations/auth";
import { headers } from "next/headers";

export type VoroodActionState = {
  error?: string;
  success?: boolean;
};

export async function voroodAction(
  _: VoroodActionState,
  formData: FormData,
): Promise<VoroodActionState> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = voroodSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error:
        "اطلاعات وارد شده معتبر نیست. لطفا ایمیل و رمز عبور را بررسی کنید.",
    };
  }

  const { email, password } = parsed.data;

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!result?.user) {
      return {
        error: "ایمیل یا رمز عبور اشتباه است",
      };
    }
    

    // if (result?.user) {
    //   if (result.user.role !== "admin") {
    //     await auth.api.signOut({
    //       headers: await headers()
    //     });

    //     return {
    //       error: "ایمیل یا رمز عبور اشتباه است",
    //     };
    //   }
    // }

    return {
      success: true,
    };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "INVALID_EMAIL_OR_PASSWORD"
    ) {
      return { error: "ایمیل یا رمز عبور اشتباه است" };
    }

    return { error: "خطا در ورود" };
  }
}
