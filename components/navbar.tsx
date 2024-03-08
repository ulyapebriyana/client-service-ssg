import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="border-b p-4">
        <div className="flex justify-between items-center container">
            <Link href={"/"} className="">Logo</Link>
            <div className="flex gap-5">
                <Link href={"/dashboard"} className={buttonVariants()}>Sign In</Link>
                <Button variant={"outline"}>Sign Up</Button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar