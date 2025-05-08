"use client";
import Link from "next/link";
import Navbar from "../ui/navbar";
import { Roboto } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/ui/app-sidebar";
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
import AsideSections from "@/app/ui/aside";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [tabs, setTabs] = useState([
    { href: "/", label: "Home" },
    { href: "/course", label: "Course" },
  ]);
  // useEffect(() => {
  //   console.log(window.location.href);
  //   const currentURL = window.location.href.split("/").slice(3);
  //   const mappedURL = currentURL.map((item) => {
  //     return { href: `/${item}`, label: item[0].toUpperCase() + item.slice(1) };
  //   });
  //   setTabs((prev) => {
  //     return [prev[0], ...mappedURL];
  //   });
  //   console.log(mappedURL);
  // }, []);

  return (
    <div className="bg-zinc-100">
      {/* <Navbar /> */}
      <SidebarProvider defaultOpen={true} className="">
        <AppSidebar setTabs={setTabs} className="" />
        <div className="w-full grid grid-cols-[minmax(0,_0.7fr)_minmax(0,_0.3fr)]">
          <main className=" col-start-1 col-end-2 bg-white p-6 m-4 border-2 border-gray-200 rounded-md w-full">
            <Breadcrumb className="">
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
            <div className="flex gap-4">{children}</div>
          </main>
          <AsideSections />
        </div>
      </SidebarProvider>
    </div>
  );
}
