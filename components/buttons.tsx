"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export const SignOutButton = () => {
  return (
    <Button
      variant={"destructive"}
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
    >
      Sign Out
    </Button>
  );
};

export const GetStartedButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      Get Started
    </Button>
  );
};
