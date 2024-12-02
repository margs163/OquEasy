import "./globals.css";
import Link from "next/link";
import Navbar from "./ui/navbar";
import { Roboto } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";

import { Megaphone, ServerCrash, HeartPulse } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";

export const metadata = {
  title: "Main Page prototype",
  description: "A page prototype of main course page",
};

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const tabs = [
  { href: "/#", label: "Course" },
  { href: "/algorithms", label: "Sorting Algorithms" },
  { href: "/heapsort", label: "Heap Sort" },
  { href: "/theory", label: "Theory" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-zinc-100 antialiased`}>
        <Navbar />
        <SidebarProvider className="">
          <AppSidebar className="" />
          <div className="w-full grid grid-cols-[minmax(0,_0.7fr)_minmax(0,_0.3fr)]">
            <main className=" col-start-1 col-end-2 bg-white p-2 m-4 border-2 border-gray-200 rounded-md w-full">
              <Breadcrumb className="ml-4 mt-2">
                <BreadcrumbList>
                  {tabs.map((item, index) => {
                    return (
                      <div
                        className="flex items-center justify-center gap-2"
                        key={index}
                      >
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href={item.href} className="text-neutral-500">
                              {item.label}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </div>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
              {/* <SidebarTrigger className="flex fixed top-5" /> */}
              <div className="flex mx-2 mt-8 gap-4">{children}</div>
            </main>
            <aside className=" col-start-2 col-end-3 mx-8 mt-4 flex flex-col gap-8">
              <Card className="bg-white text-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-700">Archive</CardTitle>
                </CardHeader>
                <hr className="w-full border-1 mb-6" />
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    <li className="flex justify-start gap-2">
                      <Megaphone size={22} className=" text-green-600" />
                      <Link href={"#"}>Announcement of November</Link>
                    </li>
                    <hr />
                    <li className="flex justify-start gap-2">
                      <ServerCrash size={22} className="text-green-600" />
                      <Link href={"#"}>Hardest question</Link>
                    </li>
                    <hr />
                    <li className="flex justify-start gap-2">
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
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
