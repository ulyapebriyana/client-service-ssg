import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import BarChart from "@/components/bar-chart";
import SalesCard, { SalesProps } from "@/components/sales-card";
import Card, { CardProps, CardContent } from "@/components/card";
import {
  formatToRupiah,
  getMember,
  getRecentTransactions,
  getRevenue,
  getRevenueEveryMonth,
  getTotalTransaction,
  getUsers,
} from "@/lib/admin-actions";

const Overview = async () => {
  
  const revenue = await getRevenue();
  const users = await getUsers();
  const members = await getMember();
  const transactions = await getTotalTransaction();
  const getAllRevenue = await getRevenueEveryMonth();
  const recentTransactions = await getRecentTransactions();

  const cardData: CardProps[] = [
    {
      label: "Total Revenue",
      amount: formatToRupiah(revenue.totalRevenue),
      description: `${revenue.percentChange} from last month`,
      icon: DollarSign,
    },
    {
      label: "Memberships",
      amount: members.totalMembers.toString(),
      description: `${members.differenceMember} from last month`,
      icon: Users,
    },
    {
      label: "Transactions",
      amount: transactions.totalTransactions.toString(),
      description: `${transactions.percentChange} from last month`,
      icon: CreditCard,
    },
    {
      label: "Active Users",
      amount: users.countUsers.toString(),
      description: `+${users.differenceUsers} from last month`,
      icon: Activity,
    },
  ];

  return (
    <div className="flex flex-col gap-5  w-full">
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((data, index) => (
          <Card
            key={index}
            amount={data.amount}
            description={data.description}
            icon={data.icon}
            label={data.label}
          />
        ))}
      </section>

      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview(Rp)</p>

          <BarChart revenueData={getAllRevenue} />
        </CardContent>

        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Transactions</p>
            <p className="text-sm text-gray-400">
              You made {transactions.totalTransactions} sales this month.
            </p>
          </section>
          {recentTransactions.map((data, i) => (
            <SalesCard
              key={i}
              telegramId={data.telegramId}
              name={data.name}
              price={data.price}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
};

export default Overview;
