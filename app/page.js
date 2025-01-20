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
import Navbar from "./ui/navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="flex relative -top-8">
        <section className="grid grid-cols-[0.6fr_0.6fr] items-center max-w-[1200px] mx-auto">
          <div className=" col-start-1 col-end-1 flex justify-center items-center flex-col gap-16 ml-4">
            <div className="flex justify-center items-start flex-col gap-4">
              <h1 className="text-7xl font-extrabold tracking-[-0.1rem] uppercase leading-[1.1] text-gray-700 drop-shadow-md">
                Study Olympiad{" "}
                <span className="text-green-600">Programming</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Learn about Data Structures and Algorithms to effectively solve
                olympiad problems. Learn by studying fundamental algorithms,
                data structures.
              </p>
            </div>
            <div className="self-start flex gap-6">
              <button className="text-white bg-green-500 py-4 px-6 rounded-3xl text-xl font-medium">
                Get Started
              </button>
              <button className="text-green-500 bg-white py-4 px-6 rounded-3xl text-xl font-medium border-[2px] border-green-500">
                Show More
              </button>
            </div>
          </div>
          <div className="col-start-2 col-end-2 mb-16">
            <Image
              src={"/students.png"}
              width={600}
              height={600}
              className="w-full object-cover"
              alt="students"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
