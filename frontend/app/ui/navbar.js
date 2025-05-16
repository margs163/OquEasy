import { Button } from "@/components/ui/button";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full text-base p-3 px-6 bg-white font-medium text-neutral-600 flex items-center justify-between border-gray-200">
      <div className="flex flex-row">
        <span className="text-3xl font-semibold text-green-900 ">Oqy</span>
        <span className="text-3xl font-semibold text-green-900 ">Easy</span>
      </div>
      <ul className="w-full list-none flex justify-center items-center gap-8 px-2">
        <li className="ml-auto hidden md:flex">
          <Link className=" hover:text-green-600" href={"#"}>
            About
          </Link>
        </li>
        <li className="hidden md:flex">
          <Link className=" hover:text-green-600" href={"/course"}>
            Course
          </Link>
        </li>
        <li className="hidden md:flex">
          <Link className=" hover:text-green-600" href={"#"}>
            Contact
          </Link>
        </li>
        <li className="flex items-center ml-auto gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link href={"#"} className="hidden md:flex">
            <Button
              variant="outline"
              className=" hover:bg-gray-100 hover:text-gray-800 hover:border-gray-300"
            >
              Profile
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
