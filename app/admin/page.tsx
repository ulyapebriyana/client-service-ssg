import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/overview";
import TransactionDetail from "@/components/transaction-detail";

const AdminDashboard = async () => {
  const session = await auth();

  if (!session?.user.isAdmin) {
    return redirect("/");
  }

  return (
    <section className="py-10 ">
      <div className="flex items-center justify-center">
        <Tabs defaultValue="overview" className="container w-full">
          <TabsList className="grid max-w-md grid-cols-3" >
            <TabsTrigger value="overview" >Overview</TabsTrigger>
            <TabsTrigger value="transactionDetail">
              Transaction Detail
            </TabsTrigger>
            <TabsTrigger value="memberDetail">Member Detail</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>

          <TabsContent value="transactionDetail">
            <TransactionDetail />
          </TabsContent>

          <TabsContent value="memberDetail">
            <TransactionDetail />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AdminDashboard;
