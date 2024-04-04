"use client";

import { forgotPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/actions";
import { useFormState } from "react-dom";

const initialState = {
  success: false,
  message: "",
};

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(forgotPassword, initialState);
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      telegramId: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    startTransition(async () => {
      formAction(values);
    });
  }

  return (
    <Form {...form}>
      <Alert
        variant={state.success ? "success" : "destructive"}
        className={cn(`mb-6`, state?.message ? "block" : "hidden")}
      >
        {state.success ? (
          <CheckCircledIcon className="h-4 w-4" />
        ) : (
          <ExclamationTriangleIcon className="h-4 w-4" />
        )}

        <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
        <AlertDescription>{state?.message}</AlertDescription>
      </Alert>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="telegramId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram Id</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
