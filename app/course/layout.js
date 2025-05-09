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
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }) {
  const [tabs, setTabs] = useState([
    { href: "/", label: "Home" },
    { href: "/course", label: "Course" },
  ]);

  return (
    <div className="bg-zinc-100">
      <SidebarProvider defaultOpen={true} className="">
        <AppSidebar setTabs={setTabs} className="" />
        <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,_0.7fr)_minmax(0,_0.3fr)] px-4 md:p-0">
          <main className=" col-start-1 col-end-1 lg:col-end-2 bg-white p-6 m-4 border-2 border-gray-200 rounded-md w-full mx-auto lg:mx-4">
            <div className="flex gap-2 items-center w-full">
              <SidebarTrigger className="text-gray-600" />
              <span className="w-3 h-full pb-0.5 text-gray-700">|</span>
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
                            <Link
                              href={item.href}
                              className="text-neutral-500 text-xs md:text-sm"
                            >
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
            </div>
            <div className="flex gap-4">{children}</div>
          </main>
          <AsideSections />
        </div>
      </SidebarProvider>
    </div>
  );
}
