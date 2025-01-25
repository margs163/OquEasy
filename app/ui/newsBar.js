import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function NewsBar({ date, content, link }) {
  return (
    <Link
      href={link}
      className="flex flex-col gap-4 shadow-sm border-[1px] border-gray-200 justify-start w-full items-start p-6 cursor-pointer rounded-lg bg-gray-100"
    >
      <div className="flex justify-start items-center gap-6">
        <p className="text-sm font-bold uppercase text-green-500 tracking-tight leading-snug">
          Category
        </p>
        <p className="text-sm font-bold uppercase text-gray-500 tracking-tight leading-snug">
          {date}
        </p>
      </div>
      <div className="flex justify-between gap-10 box-content items-center">
        <h6 className="text-lg font-medium text-gray-700 hover:underline leading-tight">
          {content}
        </h6>
        <MoveUpRight className="w-[50px] hover:text-green-500 text-gray-500" />
      </div>
    </Link>
  );
}
