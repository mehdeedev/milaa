"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useTransition } from "react";
import { voroodAction, VoroodActionState } from "@/lib/actions/vorood.action";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VoroodInput, voroodSchema } from "@/lib/validations/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";


const initialState: VoroodActionState = {};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action] = useActionState(voroodAction, initialState);
  const [isPending, startTransition] = useTransition();

  const form = useForm<VoroodInput>({
    resolver: zodResolver(voroodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: VoroodInput) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    const a = async () => {
      if(state?.success) {
        const { data: session, error } = await authClient.getSession()
        debugger
      window.location.href = process.env.NEXT_PUBLIC_APP_URL + "/dashboard" 
      }
    }

    a();
    
  }, [ state ])

  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state?.error}</AlertDescription>
            </Alert>
          )}

          {state?.success && (
            <Alert>
              <AlertDescription>Logged in successfully 🎉</AlertDescription>
            </Alert>
          )}
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">میلاپلن</span>
            </a>
            <h1 className="text-xl font-bold">میلاپلن</h1>
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">ایمیل</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  dir="ltr"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  dir="ltr"
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "صبر کنید..." : "ورود"}
            </Button>
          </Field>
          <FieldSeparator>یا</FieldSeparator>
          <Field className="">
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              ورود با گوگل
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
