import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/dashboard" className={buttonVariants()}>go dashboard</Link>
    </main>
  );
}
