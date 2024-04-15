"use client";

import { resetPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
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
import { resetPassword } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Loader2 } from "lucide-react";

const initialState = {
  success: false,
  message: "",
};

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(resetPassword, initialState);
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    startTransition(async () => {
      const newValues = {
        token,
        ...values,
      };
      formAction(newValues);
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <div className="flex flex-row items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
