"use client";
import {
  UserCircle,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  ChevronUp,
  Zap,
  PackageSearch,
  Waypoints,
  Network,
  Grid2X2,
  Table,
  Code,
  Pen,
  Hash,
  SwatchBook,
  Lightbulb,
  FileCode,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
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
import { useState } from "react";

const sidebarItems = [
  {
    topic: {
      name: "Основы Программирования на C++",
      link: "c",
      icon: <FileCode />,
    },
    subTopics: [
      { name: "Структура программы на С++", link: "/с-intro" },
      { name: "Условный оператор и вложенные условия", link: "/c-branching" },
      { name: "Циклы. Оператор цикла While", link: "/c-cycles" },
      { name: "Действительные числа. Функции cmath", link: "/c-cmath" },
    ],
  },
  {
    topic: { name: "Жадные алгоритмы", link: "greedy", icon: <Zap /> },
    subTopics: [
      { name: "Принципы жадного подхода", link: "/greedy-principles" },
      { name: "Два указателя", link: "/greedy-two-pointers" },
      { name: "Примеры классических задач", link: "/greedy-examples" },
      { name: "Реализация и типичные ошибки", link: "/greedy-implementation" },
    ],
  },
  {
    topic: { name: "Поиски", link: "search", icon: <PackageSearch /> },
    subTopics: [
      { name: "Бинарный поиск по массиву", link: "/search-binary-array" },
      {
        name: "Бинарный поиск: реализация",
        link: "/search-binary-implementation",
      },
      {
        name: "Бинарный поиск: примеры задач",
        link: "/search-binary-examples",
      },
      { name: "Бинарный поиск по ответу", link: "/search-answer-binary" },
      {
        name: "Бинарный поиск по ответу: примеры задач",
        link: "/search-answer-binary-examples",
      },
      { name: "Тернарный поиск", link: "/search-ternary" },
      {
        name: "Тернарный поиск: реализация",
        link: "/search-ternary-implementation",
      },
      {
        name: "Тернарный поиск: примеры задач",
        link: "/search-ternary-examples",
      },
    ],
  },
  {
    topic: { name: "Графы", link: "graphs", icon: <Waypoints /> },
    subTopics: [
      { name: "DFS: теория", link: "/graphs-dfs-theory" },
      { name: "DFS: реализация", link: "/graphs-dfs-implementation" },
      { name: "DFS: примеры задач", link: "/graphs-dfs-examples" },
      { name: "BFS: теория", link: "/graphs-bfs-theory" },
      { name: "BFS: реализация", link: "/graphs-bfs-implementation" },
      { name: "BFS: примеры задач", link: "/graphs-bfs-examples" },
      { name: "Алгоритм Дейкстры", link: "/graphs-daskter" },
      { name: "Форд-Беллман", link: "/graphs-bellman-ford" },
      { name: "Флойд-Уоршелл", link: "/graphs-floyd-warshall" },
      { name: "Диаметр графа", link: "/graphs-diameter" },
    ],
  },
  {
    topic: { name: "Деревья", link: "trees", icon: <Network /> },
    subTopics: [
      { name: "Дерево Фенвика", link: "/trees-fenwick" },
      { name: "Дерево отрезков", link: "/trees-segment" },
    ],
  },
  {
    topic: {
      name: "Разреженные таблицы",
      link: "sparse-tables",
      icon: <Table />,
    },
    subTopics: [
      { name: "Sparse Table", link: "/sparse-sparse-table" },
      { name: "Disjoint Sparse Table", link: "/sparse-disjoint-sparse-table" },
    ],
  },
  {
    topic: {
      name: "Динам. Программ.",
      link: "dp",
      icon: <Code />,
    },
    subTopics: [
      { name: "Основы ДП", link: "/dp-basics" },
      { name: "Задача о рюкзаке", link: "/dp-knapsack" },
      { name: "Пути в сетке", link: "/dp-grid-paths" },
      {
        name: "Наибольшая возрастающая подпоследовательность",
        link: "/dp-lis",
      },
    ],
  },
  {
    topic: { name: "Бор (Trie)", link: "trie", icon: <Pen size={20} /> },
    subTopics: [
      { name: "Построение Trie", link: "/trie-construction" },
      { name: "Поиск подстрок", link: "/trie-search" },
      { name: "Реализация", link: "/trie-implementation" },
      { name: "Примеры задач", link: "/trie-examples" },
    ],
  },
  {
    topic: {
      name: "Хеш-функция строк",
      link: "string-hashing",
      icon: <Hash />,
    },
    subTopics: [
      { name: "Теория хеширования", link: "/string-hashing-theory" },
      {
        name: "Полиномиальное хеширование",
        link: "/string-hashing-polynomial",
      },
      { name: "Примеры задач", link: "/string-hashing-examples" },
    ],
  },
  {
    topic: { name: "Алгоритм Мо", link: "mo-algorithm", icon: <SwatchBook /> },
    subTopics: [
      { name: "Применение", link: "/mo-algorithm-usecases" },
      { name: "Реализация", link: "/mo-algorithm-implementation" },
      { name: "Примеры задач", link: "/mo-algorithm-examples" },
    ],
  },
  {
    topic: { name: "Интересные факты", link: "facts", icon: <Lightbulb /> },
    subTopics: [
      { name: "Формулы: делители", link: "/facts-divisors" },
      { name: "Простые числа", link: "/facts-primes" },
      { name: "Наблюдения из теории чисел", link: "/facts-number-theory" },
      { name: "Олимпиадные трюки", link: "/facts-tricks" },
    ],
  },
];

export function AppSidebar({ setTabs }) {
  function handleBreadrum(link, name) {
    const newURL = {
      href: "/course" + link,
      label: name,
    };
    setTabs((prev) => {
      return [...prev.slice(0, 2), newURL];
    });
  }
  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      className="h-full text-gray-700 text-lg"
    >
      <SidebarHeader className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-8 px-4">
              <Link href="#">
                {/* <Image src={"/olympiad.png"} width={500} height={500} alt="logo" /> */}
                <span className="text-3xl font-semibold text-emerald-500 ">
                  OqyEasy
                </span>
                {/* <span className="text-3xl font-semibold text-green-600 ">
                  Easy
                </span> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="h-0.5 bg-gray-200" />
      <SidebarContent className="pt-4">
        <SidebarGroup className="text-lg">
          <SidebarGroupLabel className="uppercase text-gray-500 pl-2 tracking-widest font-semibold">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col">
              {sidebarItems.map((item, index) => {
                return (
                  <Collapsible
                    key={uuidv4()}
                    className="group/collapsible data-[state=open]:text-emerald-600"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="text-base h-auto font-medium px-2">
                          {item.topic.icon}
                          {`${index + 1} ${item.topic.name}`}
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="">
                        <SidebarMenuSub className="border-l-4 rounded border-l-emerald-400 ml-4">
                          {item.subTopics.map((sub, subindex) => {
                            return (
                              <SidebarMenuSubItem
                                key={uuidv4()}
                                className="text-gray-400"
                              >
                                <SidebarMenuSubButton asChild className="">
                                  <Link
                                    onClick={() => {
                                      handleBreadrum(sub.link, sub.name);
                                    }}
                                    href={"/course" + sub.link}
                                    className="text-base h-auto font-medium hover:text-emerald-700"
                                  >
                                    {`${index + 1}.${subindex + 1} ${sub.name}`}
                                  </Link>
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
