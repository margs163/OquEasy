"use client";
import {
  Megaphone,
  ServerCrash,
  HeartPulse,
  CalendarDays,
  Calendar1,
  PanelRight,
  Clock,
  Book,
  Presentation,
  FileText,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar as CalendarComp } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DayPicker } from "react-day-picker";
import { Description } from "@radix-ui/react-dialog";

const news = [
  {
    title: "Mock Competition",
    date: "May 13, 2025",
    time: "4:00 PM",
    description: "Practice your skills in a timed competition environment.",
  },
  {
    title: "Live Problem Solving",
    date: "May 20, 2025",
    time: "5:00 PM",
    description: "Watch an expert solve hard problems in real-time.",
  },
  ,
];

export default function AsideSections({ data }) {
  const [date, setDate] = useState(new Date());
  const presentations = data?.presentations;
  const fileNames =
    presentations &&
    presentations.map((item) => {
      return item.split("/").at(-1);
    });
  console.log(fileNames);

  const isMobile = useIsMobile();
  return (
    <aside className="lg:col-start-2 lg:col-end-3 lg:mx-4 lg:ml-8 lg:mt-4 lg:flex lg:flex-col lg:gap-8 h-8">
      {isMobile ? (
        <Sheet className="bg-white">
          <SheetTrigger>
            <PanelRight
              size={18}
              className="p-1.5 rounded-lg bg-white hover:bg-emerald-500 hover:text-white text-emerald-500 border border-slate-100 flex-shrink-0 box-content shadow-sm"
            />
          </SheetTrigger>
          <SheetContent className="bg-white w-[320px] p-6 flex flex-col gap-10">
            <SheetHeader className={"hidden"}>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 justify-start items-center">
                <CalendarIcon size={20} />
                <h3 className="text-lg font-semibold text-gray-800">{`${date.toLocaleString(
                  "default",
                  {
                    month: "long",
                  }
                )} ${date.getFullYear()}`}</h3>
              </div>
              <CalendarComp
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-slate-100/80 rounded-xl text-xs"
              />
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 justify-start items-center">
                <Clock size={22} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Archived News
                </h3>
              </div>
              <div className="space-y-4">
                {news.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="border-l-[3px] rounded-md border-emerald-500 p-4 bg-slate-50 cursor-pointer shadow-sm"
                    >
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <div className="text-xs flex gap-2 text-gray-600 leading-relaxed mb-2">
                        <p>{item.date}</p>
                        <p>{item.time}</p>
                      </div>
                      <p className=" leading-snug">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 justify-start items-center">
                <Book size={22} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Related Sources
                </h3>
              </div>
              <div className="">
                {presentations &&
                  presentations.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                          <div>
                            <FileText
                              size={22}
                              className="box-content p-2 text-indigo-500 bg-slate-100 rounded-lg"
                            />
                          </div>
                          <div>
                            <h3 className="text-base font-medium">
                              {fileNames[index][0].toUpperCase() +
                                fileNames[index].slice(1)}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                              PDF • 8 min read
                            </p>
                          </div>
                        </div>
                        <hr className="w-full h-[2px] bg-gray-100" />
                      </div>
                    );
                  })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Card className="bg-white text-gray-700 shadow-sm rounded-xl">
          {/* <hr className="w-full border-1 mb-2" /> */}
          <CardContent className="p-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 justify-start items-center">
                <CalendarIcon size={20} />
                <h3 className="text-lg font-semibold text-gray-800">{`${date.toLocaleString(
                  "default",
                  {
                    month: "long",
                  }
                )} ${date.getFullYear()}`}</h3>
              </div>
              <CalendarComp
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-slate-100/80 rounded-xl text-xs"
              />
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 justify-start items-center">
                <Clock size={22} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Archived News
                </h3>
              </div>
              <div className="space-y-4">
                {news.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="border-l-[3px] rounded-md border-emerald-500 p-4 bg-slate-50 cursor-pointer shadow-sm"
                    >
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <div className="text-xs flex gap-2 text-gray-600 leading-relaxed mb-2">
                        <p>{item.date}</p>
                        <p>{item.time}</p>
                      </div>
                      <p className=" leading-snug">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 justify-start items-center">
                <Book size={22} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Related Sources
                </h3>
              </div>
              <div className="">
                {presentations &&
                  presentations.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                          <div>
                            <FileText
                              size={22}
                              className="box-content p-2 text-indigo-500 bg-slate-100 rounded-lg"
                            />
                          </div>
                          <div>
                            <h3 className="text-base font-medium">
                              {fileNames[index][0].toUpperCase() +
                                fileNames[index].slice(1)}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                              PDF • 8 min read
                            </p>
                          </div>
                        </div>
                        <hr className="w-full h-[2px] bg-gray-100" />
                      </div>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
