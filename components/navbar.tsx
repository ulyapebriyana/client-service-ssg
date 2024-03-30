import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./buttons";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="border-b p-4">
      <div className="flex justify-between items-center container">
        <Link href={"/"} className="">
          Logo
        </Link>
        {session ? (
          <SignOutButton />
        ) : (
          <div className="flex gap-5">
            <Link href={"/sign-in"} className={buttonVariants()}>
              Sign In
            </Link>
            <Link
              href={"/sign-up"}
              className={buttonVariants({ variant: "outline" })}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
