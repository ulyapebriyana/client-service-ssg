import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Feature from "@/components/feature";

export default async function Home() {
  const session = await auth()
  // console.log(session);
  
  return (
    <main className="flex items-center justify-center w-full h-[90vh]">
      <Feature />
    </main>
  );
}
