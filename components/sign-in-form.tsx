"use client";

import { loginSchema } from "@/schema";
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
import { signIn } from "next-auth/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      telegramId: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const signInData = await signIn("credentials", {
        redirect: false,
        telegramId: values.telegramId,
        password: values.password,
      });

      if (signInData?.ok) {
        router.refresh();
      } else {
        const errorMessage = signInData?.error;
        setMessage(errorMessage as string);
      }
    });
  }

  return (
    <Form {...form}>
      <Alert
        variant="destructive"
        className={cn(`mb-6`, message ? "block" : "hidden")}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
