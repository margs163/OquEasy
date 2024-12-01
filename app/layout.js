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

export const metadata = {
  title: "Main Page prototype",
  description: "A page prototype of main course page",
};

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const tabs = [
  { href: "/#", label: "Home" },
  { href: "/algorithms", label: "Sorting Algorithms" },
  { href: "/theory", label: "Theory" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Navbar />
        <SidebarProvider className="">
          <AppSidebar className="" />
          <main className=" bg-white p-2 m-4 border-2 border-gray-200 rounded-md w-full">
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
                          <Link href={item.href} className="text-neutral-500">{item.label}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <SidebarTrigger className="flex fixed top-5" />
            <div className="flex mx-2 mt-8 gap-4">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
