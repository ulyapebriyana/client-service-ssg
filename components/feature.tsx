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

function formatToRupiah(amount: any) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

const Feature = async () => {
  const session = await auth();

  const memberships = await prisma.membershipPlanning.findMany({
    orderBy: {
      duration: "asc",
    },
  });

  return (
    <section className="h-full">
      <div className="flex gap-10 flex-col md:flex-row">
        {memberships.map((planning) => (
          <Card key={planning.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{planning.duration} Bulan</CardTitle>
              <CardDescription>
                {formatToRupiah(planning.price)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              cumque distinctio error sint ad culpa blanditiis tenetur
              consectetur odio molestiae officiis, laudantium voluptatem fuga
              explicabo repudiandae in delectus quos natus!
            </CardContent>
            <CardFooter>
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
