"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import LottieImage from "@/public/homepage.json";
import { Button, buttonVariants } from "./ui/button";
import { Link } from "react-scroll";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo-ssg.png";

const Onboarding = () => {
  return (
    <section className="flex items-center justify-evenly md:justify-between w-full border-b py-20 md:py-4 h-[90vh] flex-col md:flex-row">
      <div className="md:hidden">
        <Image src={Logo} alt="Logo.jpg" priority height={300} width={300} />
      </div>
      <div className="flex flex-col md:gap-8 gap-10">
        <h1 className="text-3xl font-bold md:text-5xl text-center md:text-left">
          Selamat Datang di Stock Saham Gorengan
        </h1>
        <p className="text-xl text-center md:text-left">
          Kami sebagai tim dari SSG siap anda menjadi trader mandiri!. Untuk itu
          segera daftarkan diri anda sebagai bagian dari kami!
        </p>
        <Link
          to={"pricingPlans"}
          smooth={true}
          spy={true}
          duration={500}
          className={cn(buttonVariants(), "md:w-40 cursor-pointer")}
        >
          Get Started
        </Link>
      </div>
      <div className="hidden md:block">
        <Player
          src={LottieImage}
          className="h-[500px] w-[500px] lg:h-[750px] lg:w-[750px]"
          autoplay
          loop
        />
      </div>
    </section>
  );
};

export default Onboarding;
