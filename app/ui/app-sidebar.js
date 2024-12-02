import {
  UserCircle,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const sidebarItems = [
  {
    topic: "Dynamic Programming",
    subTopics: [
      "House Robber",
      "Min Cost Path",
      "Decode Ways",
      "Subset Sum problems",
      "Coin Change problem",
    ],
  },
  {
    topic: "Sorting Algorithms",
    subTopics: [
      "Bubble Sort",
      "Merge Sort",
      "Insertion Sort",
      "Quick Sort",
      "Heap Sort",
      "Selection Sort",
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="h-full text-gray-700 text-lg">
      <SidebarHeader className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-8 px-4">
              <Link href="#">
                {/* <Image src={"/olympiad.png"} width={500} height={500} alt="logo" /> */}
                <span className="text-3xl font-semibold text-green-600 ">Oqy</span>
                <span className="text-3xl font-semibold text-green-600 ">Easy</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="text-lg">
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => {
                return (
                  <Collapsible key={index} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className=" text-base">
                          {`${index + 1}. ${item.topic}`}
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subTopics.map((sub, index) => {
                            return (
                              <SidebarMenuSubItem key={index}>
                                <SidebarMenuSubButton asChild>
                                  <Link href="#" className="text-base">{sub}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-2 border-gray-200 rounded-md p-1 m-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <SidebarMenuButton asChild>
                  <Link href={"#"}>
                    <span>More</span>
                    <ChevronUp className="ml-auto" />
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
