import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth()
  // console.log(session);
  
  return (
    <main className="flex items-center justify-center w-full h-[90vh]">
      <div className="text-3xl">Aplikasi masih dalam tahap pengembangan</div>
    </main>
  );
}
