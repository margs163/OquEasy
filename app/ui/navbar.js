import { Button } from "@/components/ui/button";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full text-base p-3 bg-gray-100/70 font-medium text-neutral-600 flex items-center justify-center">
      <ul className="ml-[16rem] w-full list-none flex justify-center items-center gap-8 px-2">
        <li className="ml-auto">
          <Link href={"#"}>About</Link>
        </li>
        <li>
          <Link href={"#"}>News</Link>
        </li>
        <li>
          <Link href={"#"}>Contact</Link>
        </li>
        <li className="flex items-center ml-auto gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link href={"#"}>
            <Button variant="outline" className=" hover:bg-gray-200/80">Profile</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
