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
            <form action={createTransactionDetails}>
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
                <GetStartedButton />
              </CardFooter>

              <input
                type="hidden"
                name="userId"
                value={session?.user.userId as string}
              />
              <input
                type="hidden"
                name="telegramId"
                value={session?.user.telegramId as string}
              />
              <input
                type="hidden"
                name="membershipId"
                value={membership.id as string}
              />
              <input
                type="hidden"
                name="price"
                value={Number(membership.price)}
              />
              <input
                type="hidden"
                name="memberDuration"
                value={membership.duration}
              />
            </form>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Feature;
