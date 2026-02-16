import { z } from "zod";

export const categoryFormSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است").max(120),

  slug: z
    .string()
    .min(1, { message: "نامک الزامی است" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "فرمت نامک نادرست است",
    }),

});
/* ---------- inferred type ---------- */
export type CategoryFormInput = z.input<typeof categoryFormSchema>;
