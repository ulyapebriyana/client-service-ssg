import Feature from "@/components/feature";
import Onboarding from "@/components/onboarding";
import { Footer } from "@/components/footer";

export default async function Home() {

  return (
    <main className="container flex flex-col items-center justify-center gap-20">
      <Onboarding />
      <Feature />
      <Footer />
    </main>
  );
}
