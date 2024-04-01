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
import { createTransactionDetails } from "@/lib/actions";
import { GetStartedButton } from "./buttons";
import Payment from "./payment";

function formatToRupiah(amount: any) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

const Feature = async () => {
  const session = await auth();

  const memberships = await prisma.membership.findMany({
    orderBy: {
      duration: "asc",
    },
  });

  return (
    <section>
      <div className="flex gap-10">
        {memberships.map((membership) => (
          <Card key={membership.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{membership.duration} Bulan</CardTitle>
              <CardDescription>
                {formatToRupiah(membership.price)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              cumque distinctio error sint ad culpa blanditiis tenetur
              consectetur odio molestiae officiis, laudantium voluptatem fuga
              explicabo repudiandae in delectus quos natus!
            </CardContent>
            <CardFooter>
              {/* <TestGetstarted /> */}
              <Payment
                memberDuration={membership.duration}
                membershipId={membership.id}
                telegramId={session?.user.telegramId as string}
                price={Number(membership.price)}
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
