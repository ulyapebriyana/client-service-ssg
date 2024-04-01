"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap: any;
  }
}

interface Props {
  userId: string;
  telegramId: string;
  price: number;
  membershipPlanningId: string;
  memberDuration: number;
  email: string;
}

const Payment = ({
  userId,
  telegramId,
  price,
  membershipPlanningId,
  memberDuration,
  email
}: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.CLIENT_KEY as string;

    let scriptTag = document.createElement("script");

    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    scriptTag.async = true;

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePay = () => {
    startTransition(async () => {
      if (!session) {
        return router.push("/sign-in");
      }
      const getToken = await fetch(
        `${process.env.NEXT_PUBLIC_ROUTE_ORIGIN}/api/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            telegramId: telegramId,
            price: price,
            membershipPlanningId: membershipPlanningId,
            memberDuration: memberDuration,
            email: email
          }),
        }
      );

      const data = await getToken.json();
      console.log(data);

      window.snap.pay(data.data.token);
    });
  };

  return (
    <div className="w-full">
      <Button
        onClick={handlePay}
        variant={"destructive"}
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Get Started"}
      </Button>
    </div>
  );
};

export default Payment;
