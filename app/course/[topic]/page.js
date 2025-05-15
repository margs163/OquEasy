"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";
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
import MarkDownIt from "markdown-it";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AsideSections from "@/app/ui/aside";

export default function Page() {
  const { topic } = useParams();
  const decodedTopic =
    decodeURIComponent(topic.split("-")[0]) + "-" + topic.split("-")[1];
  const mdRefence = useRef(
    new MarkDownIt({
      html: true,
    })
  );
  const [data, setData] = useState(null);
  const elementRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch(`http://localhost:8000/content/${topic}`);
        if (!response.ok) {
          throw Error("damn");
        }
        const data = await response.json();
        setData((prev) => data);
        const content = data?.theory?.content;

        while (elementRef.current.lastElementChild) {
          elementRef.current.removeChild(elementRef.current.lastElementChild);
        }

        if (data?.images.length > 0) {
          const imgElement = document.createElement("img");
          imgElement.src = data?.images[0];
          imgElement.alt = "someImage";
          imgElement.classList.add("lg:w-3/5", "w-3/4", "mx-auto", "my-2");
          elementRef.current.appendChild(imgElement);
        }

        content.forEach((element) => {
          const newDiv = document.createElement("div");
          newDiv.innerHTML = mdRefence.current.render(element);
          newDiv.classList.add(
            "text-[0.9rem]",
            "lg:text-[1.1rem]",
            "font-normal",
            "leading-relaxed",
            "text-gray-700",
            "text-pretty"
          );

          elementRef.current.appendChild(newDiv);
        });
      } catch (e) {
        throw Error(e);
      }
    }
    fetchResources();
  }, []);
  const tabs = [
    { value: "theory", displayName: "Теория" },
    { value: "practice", displayName: "Практика" },
    { value: "discussion", displayName: "Дисскусия" },
  ];
  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,_0.68fr)_minmax(0,_0.32fr)] px-4 md:p-0">
      <div className="col-start-1 col-end-1 lg:col-end-2 w-full mx-auto lg:mx-4">
        <div className="space-y-4 pt-2">
          <Tabs defaultValue="theory" className="">
            <TabsList className=" py-8 lg:py-8 flex justify-center lg:justify-start items-center gap-2 lg:gap-4 text-gray-700">
              <SidebarTrigger className="p-3 bg-white hover:bg-emerald-500 hover:text-white text-emerald-500 border border-slate-100 shadow-sm" />
              {tabs.map((item, index) => {
                return (
                  <TabsTrigger
                    key={index}
                    value={item.value}
                    className="data-[state=active]:shadow-sm data-[state=active]:bg-emerald-500/90 data-[state=active]:text-gray-50 text-sm lg:text-base py-2 px-4 rounded-lg bg-white text-gray-500 border border-slate-100 shadow-sm"
                  >
                    {item.displayName}
                  </TabsTrigger>
                );
              })}
              {isMobile && <AsideSections data={data} />}
            </TabsList>
            <TabsContent value="theory">
              <Card className="w-full bg-white shadow-sm rounded-xl">
                <CardHeader className="flex flex-col justify-start pb-0">
                  <CardTitle className="text-3xl lg:text-3xl text-emerald-600 font-bold tracking-[0.015rem]">
                    {data?.theory?.mainHeading}
                    <hr className="mt-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent
                  id="renderMarkDown"
                  ref={elementRef}
                  className="flex flex-col gap-4 topic"
                >
                  {/*
                <div className="mt-5 flex flex-col gap-4">
                <p className="text-lg font-normal leading-loose text-gray-700">
                Heap Sort is a{" "}
                <span className="text-green-600">
                popular and efficient
                </span>{" "}
                sorting algorithm in computer programming. Learning how to
                write the heap sort algorithm requires knowledge of two
                types of data structures - arrays and trees.
                </p>
                <p className="text-lg font-normal leading-loose text-gray-700">
                The initial set of numbers that we want to sort is stored in
                an array e.g.{" "}
                <code className="bg-gray-200/80 text-gray-800 text-base p-1 rounded-sm">
                [10, 3, 76, 34, 23, 32]
                </code>{" "}
                and after sorting, we get a sorted array{" "}
                <code className="bg-gray-200/80 text-gray-800 text-base p-1 rounded-sm">
                      [3, 10, 23, 32, 34, 76]
                    </code>
                    .Heap sort works by visualizing the elements of the array as
                    a special kind of complete binary tree called a heap.
                    </p>
                    <hr className="my-4" />
                    <h3 className="text-2xl font-semibold text-green-700">
                    Relationship between Array Indexes and Tree Elements
                    </h3>
                    <p className="text-lg font-normal leading-loose text-gray-600">
                    A complete binary tree has an interesting property that we
                    can use to find the children and parents of any node.
                    </p>
                    <p className="text-lg font-normal leading-loose text-gray-600">
                    If the index of any element in the array is{" "}
                    <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">
                    i
                    </code>
                    , the element in the index{" "}
                    <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">
                    2i+1
                    </code>{" "}
                    will become the left child and element in{" "}
                    <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">
                    2i+2
                    </code>{" "}
                    index will become the right child. Also, the parent of any
                    element at index{" "}
                    <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">
                    i
                    </code>{" "}
                    is given by the lower bound of{" "}
                    <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">
                    (i-1)/2
                    </code>
                    .
                    </p>
                    </div> */}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="practice">
              This is a practice goddamn tab
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {!isMobile && <AsideSections data={data} />}
    </main>
  );
}
