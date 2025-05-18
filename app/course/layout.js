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

import { Megaphone, ServerCrash, HeartPulse, PanelRight } from "lucide-react";

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
import NavbarCourse from "../ui/navbarCourse";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Layout({ children }) {
  const [tabs, setTabs] = useState([
    { href: "/", label: "Главная" },
    { href: "/course", label: "Модули" },
  ]);
  const isMobile = useIsMobile();
  const [navbarOpen, setNavbarOpen] = useState(true);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setNavbarOpen(false);
    }
  }, []);

  return (
    <div className="bg-slate-100">
      <NavbarCourse className="" navbarOpen={navbarOpen}>
        <li className="flex items-center justify-start gap-2">
          <Breadcrumb className="">
            <BreadcrumbList className="flex justify-start items-center">
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
                          className="text-neutral-500/90 text-sm md:text-sm font-medium tracking-wider"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className={"text-neutral-500"} />
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </li>
      </NavbarCourse>
      <hr className="h-0.5 bg-gray-200" />
      <SidebarProvider
        open={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        className=""
      >
        <AppSidebar setTabs={setTabs} className="" />
        <div className="w-full">{children}</div>
      </SidebarProvider>
    </div>
  );
}
