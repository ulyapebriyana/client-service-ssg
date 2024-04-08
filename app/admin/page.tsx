import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/overview";
import TransactionDetail from "@/components/transaction-detail";
import MemberDetail from "@/components/member-detail";
import { getAllTransactions, getMemberDetail } from "@/lib/admin-actions";

const AdminDashboard = async () => {
  const session = await auth();

  if (!session?.user.isAdmin) {
    return redirect("/");
  }

  const transactions = await getAllTransactions();
  const members = await getMemberDetail();

  return (
    <section className="py-10 ">
      <div className="flex items-center justify-center">
        <Tabs defaultValue="overview" className="container w-full">
          <TabsList className="grid max-w-md grid-cols-3" >
            <TabsTrigger value="overview" >Overview</TabsTrigger>
            <TabsTrigger value="transactionDetail">
              Transaction
            </TabsTrigger>
            <TabsTrigger value="memberDetail">Member</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>

          <TabsContent value="transactionDetail">
            <TransactionDetail data={transactions} />
          </TabsContent>

          <TabsContent value="memberDetail">
            <MemberDetail data={members} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AdminDashboard;
