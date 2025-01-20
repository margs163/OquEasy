import "./globals.css";
import Link from "next/link";
import Navbar from "./ui/navbar";
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
import AsideSections from "./ui/aside";

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
        {children}
      </body>
    </html>
  );
}
