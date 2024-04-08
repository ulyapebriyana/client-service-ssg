import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import Payment from "./payment";
import { Check } from "lucide-react";

function formatToShortCurrency(amount: any) {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + "k"; // Ribu
  }
  return amount.toString();
}

const Feature = async () => {
  const session = await auth();

  const memberships = await prisma.membershipPlanning.findMany({
    orderBy: {
      duration: "asc",
    },
  });

  return (
    <section
      className="h-full border-b pb-20 flex flex-col w-full justify-center items-center gap-20"
      id="pricingPlans"
    >
      <h1 className="text-3xl font-bold md:text-5xl">Pricing Plan</h1>
      <div className="flex gap-10 flex-col md:flex-row flex-wrap justify-center">
        {memberships.map((planning) => (
          <Card key={planning.id} className="w-full max-w-sm ">
            <CardHeader className="flex gap-5">
              <CardTitle className="text-center text-2xl">
                {planning.name}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {planning.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-10">
              <div className="text-center">
                <span className="text-3xl font-bold">
                  Rp. {formatToShortCurrency(Number(planning.price))}
                </span>
                <span>/{planning.duration} bulan</span>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-2">
                  <Check />
                  <p>Layanan konsultasi setiap waktu</p>
                </li>
                <li className="flex gap-2">
                  <Check />
                  <p>Beragam menu setiap hari</p>
                </li>
                <li className="flex gap-2">
                  <Check />
                  <p>Live konsultasi pada ahir pekan</p>
                </li>
                <li className="flex gap-2">
                  <Check />
                  <p>E-book tentang investasi</p>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="mt-10">
              <Payment
                memberDuration={planning.duration}
                membershipPlanningId={planning.id}
                telegramId={session?.user.telegramId as string}
                price={Number(planning.price)}
                userId={session?.user.userId as string}
                email={session?.user.email as string}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Feature;
