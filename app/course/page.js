"use client";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card.jsx";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.jsx";

import Link from "next/link";
import { Book, Clock } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AsideSections from "../ui/aside";

export default function PageCourse() {
  const isMobile = useIsMobile();
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,_0.68fr)_minmax(0,_0.32fr)] px-4 md:p-0">
      <div className="col-start-1 col-end-1 lg:col-end-2 w-full mx-auto lg:mx-4 mt-4 bg-white">
        <Card>
          <CardHeader>
            <div className="flex gap-2 justify-start items-center">
              <SidebarTrigger className="p-3 bg-emerald-500 text-white" />
              <h1 className="text-2xl font-semibold text-green-700/80">
                О курсе
              </h1>
              {isMobile && <AsideSections data={null} />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Book size={16} />
                <span>Учиться можно сразу</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>4-5 часов на урок, начиная с третьего урока</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 mb-4">
                Программа курса на базовом уровне освещает практические основы
                программирования. В ходе обучения предстоит решить множество
                небольших задач, охватывающих основные базовые конструкции языка
                C++. Такой опыт будет полезен всем, кто хочет углубиться в
                изучение программирования. Многие задачи курса были любезно
                предоставлены Денисом Кириенко, учителем московской школы 179.
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2 text-green-700">
                Для кого этот курс
              </h2>
              <p className="text-gray-700">
                Курс рассчитан на всех, кто интересуется программированием.
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2 text-green-700">
                Начальные требования
              </h2>
              <p className="text-gray-700">
                Для усвоения материала потребуются базовые знания из школьной
                программы по математике.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      {!isMobile && <AsideSections data={null} />}
    </div>
  );
}
