import { Megaphone, ServerCrash, HeartPulse } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";

export default function AsideSections() {
  return (
    <aside className="col-start-1 col-end-1 lg:col-start-2 lg:col-end-3 mx-8 mt-4 flex flex-col gap-8">
      <Card className="bg-white text-gray-700">
        <CardHeader className="py-4 px-6">
          <CardTitle className="text-green-700">Archive</CardTitle>
        </CardHeader>
        <hr className="w-full border-1 mb-2" />
        <CardContent className="p-4 pt-0">
          <ul className="flex flex-col gap-1 text-sm">
            <li className="flex justify-start p-2 rounded-md gap-2 hover:bg-gray-100">
              <Megaphone size={22} className=" text-green-600" />
              <Link href={"#"}>Announcement of November</Link>
            </li>
            <hr />
            <li className="flex justify-start p-2 rounded-md gap-2 hover:bg-gray-100">
              <ServerCrash size={22} className="text-green-600" />
              <Link href={"#"}>Hardest question</Link>
            </li>
            <hr />
            <li className="flex justify-start hover:cursor-pointer gap-2 p-2 rounded-xl hover:bg-gray-100/80">
              <HeartPulse size={22} className="text-green-600" />
              <Link href={"#"}>I am edging</Link>
            </li>
            <hr />
          </ul>
        </CardContent>
      </Card>
      <Calendar
        mode="single"
        selected={new Date()}
        // onSelect={}
        className=" bg-white rounded-xl border shadow-sm"
      />
    </aside>
  );
}
