"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  email,
}: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Mengawasi perubahan isPending
    if (!isPending) {
      setOpen(false); // Menutup dialog saat isPending menjadi false
    }
  }, [isPending]); // Memantau perubahan isPending
  // Redeploy
  useEffect(() => {
    const midtransScriptUrl = "https://app.midtrans.com/snap/snap.js";
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
            email: email,
          }),
        }
      );

      const data = await getToken.json();
      console.log(data);

      window.snap.pay(data?.data?.token);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>
            Apakah anda yakin memilih paket {memberDuration} bulan?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse md:flex-row gap-5">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handlePay} disabled={isPending}>
            {isPending ? "Loading..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Payment;
