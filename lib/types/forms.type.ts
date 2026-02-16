import z from "zod";

export type FormActionResult<T> = 
| { success: true }
  | {
      success: false;
      errors: z.ZodFlattenedError<T>["fieldErrors"];
    }
  | {
      success: false;
      message: string;
    };