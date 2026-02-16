import z from "zod";

export type ActionResultType<T> = 
| { success: true, data?: T  }
| { success: false, errorMessage: string; errors?: never; }


export type FormErrors<T> = Partial<Record<keyof z.infer<T>, string[]>>;