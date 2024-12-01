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

export default function Home() {
  return (
    <div className="w-3/4">
      <Tabs className="w-full">
        <TabsList
          defaultValue="theory"
          className=" p-0 border-2 border-gray-200/50 rounded-md w-60 grid grid-cols-2 text-gray-700 bg-gray-100"
        >
          <TabsTrigger
            value="theory"
            className="data-[state=active]:shadow-sm data-[state=active]:bg-green-500/90 data-[state=active]:text-gray-50"
          >
            Theory
          </TabsTrigger>
          <TabsTrigger
            value="practice"
            className="data-[state=active]:shadow-sm data-[state=active]:bg-green-500/90 data-[state=active]:text-gray-50"
          >
            Practice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="theory">
          <Card className="w-full">
            <CardHeader className="flex flex-col justify-start">
              <CardTitle className="text-3xl text-green-700">
                Heap Sort
              </CardTitle>
              {/* <CardDescription className=" leading-loose text-lg text-gray-700">
                Learn about a popular sorting algorithm - heap sort
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <hr />
              <div className="mt-5 flex flex-col gap-4">
                <p className="text-lg font-normal leading-loose text-gray-600">
                  Heap Sort is a <span className="text-green-600">popular and efficient</span> sorting algorithm in
                  computer programming. Learning how to write the heap sort
                  algorithm requires knowledge of two types of data structures -
                  arrays and trees. 
                </p>
                <p className="text-lg font-normal leading-loose text-gray-600">
                  The initial set of numbers that we want to
                  sort is stored in an array e.g. <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">[10, 3, 76, 34, 23, 32]</code> and
                  after sorting, we get a sorted array <code className="bg-gray-200/80 text-gray-700 text-base p-1 rounded-sm">[3, 10, 23, 32, 34, 76]</code>.Heap
                  sort works by visualizing the elements of the array as a
                  special kind of complete binary tree called a heap.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="practice">This is a practice tab</TabsContent>
      </Tabs>
    </div>
  );
}
