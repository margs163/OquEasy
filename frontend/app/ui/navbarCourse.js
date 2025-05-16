import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NavbarCourse({ children, navbarOpen }) {
  const isMobile = useIsMobile();
  return (
    <nav className="w-full text-base p-3 px-6 bg-white font-medium text-neutral-600 flex items-center justify-between border-gray-200">
      {/* <div className="flex flex-row">
        <span className="text-3xl font-semibold text-green-900 ">Oqy</span>
        <span className="text-3xl font-semibold text-green-900 ">Easy</span>
      </div> */}
      <ul
        className={`w-full list-none flex justify-center items-center gap-2 px-2 ${
          navbarOpen && "pl-[290px]"
        }`}
      >
        {children}
        <li className="flex items-center ml-auto gap-2">
          <Avatar>
            <Link href={"/profile"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Link>
          </Avatar>
          <Link href={"/profile"} className="hidden lg:flex">
            <Button
              variant="outline"
              className=" hover:bg-gray-100 hover:text-gray-800 hover:border-gray-300"
            >
              Профиль
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
