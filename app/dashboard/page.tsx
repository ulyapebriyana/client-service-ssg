import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import FormRegistration from "@/components/registration-member";

const Dashboard = async () => {
  return (
    <main className="h-screen w-full">
      <div className="flex items-center justify-center h-full">
        <FormRegistration />
      </div>
    </main>
  );
};

export default Dashboard;
