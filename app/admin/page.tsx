import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminDashboard = async () => {
  const session = await auth();

  if (!session?.user.isAdmin) {
    return redirect("/")
  }
  
  return <div>AdminDashboard bang</div>;
};

export default AdminDashboard;
