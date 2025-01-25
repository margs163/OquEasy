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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Link from "next/link";
import Navbar from "./ui/navbar";

export default function Home() {
  const modules = [
    { topic: "Жадные Алгоритмы", img: "/module11.jpg" },
    { topic: "Алгоритмы Поисков", img: "/module2.png" },
    { topic: "Структура Графов", img: "/module31.jpg" },
    { topic: "Структура Деревьев", img: "/module41.jpg" },
    { topic: "Разреженные Таблицы", img: "/module5.jpg" },
    { topic: "Динамическое Программирование", img: "/module6.jpg" },
    { topic: "Алгоритм Бора", img: "/module7.jpg" },
    { topic: "Хэш-Функция Строк", img: "/module11.jpg" },
    { topic: "Алгоритм Мо", img: "/module11.jpg" },
    { topic: "Интересные Факты", img: "/module41.jpg" },
  ];

  const testims = [
    {
      name: "Kali Arman",
      opinion:
        "Excellent course selection and intuitive platform. Highly recommend for anyone looking to expand their skills.",
      img: "/girl1.jpg",
    },
    {
      name: "Aubakir Arman",
      opinion:
        "User-friendly interface makes learning enjoyable. Diverse curriculum covers in-demand topics. Definitely worth the investment.",
      img: "/boy1.jpg",
    },
    {
      name: "Bakibek Aldiyar",
      opinion:
        "Comprehensive courses taught by industry experts. Flexible scheduling options fit my busy lifestyle. Impressed by the platform's capabilities.",
      img: "/girl2.jpg",
    },
    {
      name: "Serikbek Asanali",
      opinion:
        "Seamless learning experience from start to finish. Wide range of subjects to choose from. Exceeded my expectations in every way.",
      img: "/boy2.jpg",
    },
  ];

  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col my-12 gap-32">
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
          <div className="col-start-2 col-end-2">
            <Image
              src={"/studentsbooks.png"}
              width={600}
              height={600}
              className="w-full object-cover"
              alt="students"
            />
          </div>
        </section>
        <section className="max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-20">
          <div>
            <h2 className="text-center text-4xl text-gray-700 font-semibold">
              We Care About Our{" "}
              <span className="text-green-600">Customer Experience</span> Too
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {testims.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center gap-4 border-[1px] rounded-xl border-gray-200 p-6 shadow-md"
                >
                  <Image
                    src={item.img}
                    width={130}
                    height={130}
                    alt="something"
                    className="rounded-[50%] object-cover box-content h-[130px]"
                  />
                  <h6 className="text-xl font-medium text-gray-700">
                    {item.name}
                  </h6>
                  <p className="text-sm text-center text-gray-600 leading-relaxed">
                    {item.opinion}
                  </p>
                  <Image
                    src={"/stars.jpg"}
                    width={150}
                    height={50}
                    alt="stars"
                    className="mt-auto object-cover"
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section className="max-w-[1200px] mx-auto flex flex-col gap-20">
          {/* <div className="flex mx-auto py-6 pb-0">
            <h3 className="text-3xl text-gray-700 font-bold rounded-xl">
              Course Modules
            </h3>
          </div> */}
          <div>
            <h2 className="text-center text-4xl text-gray-700 font-semibold">
              Our Course Consists of <span className="text-green-600">10+</span>{" "}
              Modules with <span className="text-green-600">40+</span>{" "}
              Challenging Tasks
            </h2>
          </div>
          <div className="p-6 flex flex-col gap-12 px-16 py-8 border-2 border-gray-200 rounded-xl shadow-md ">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="">
                {modules.map((module, index) => {
                  return (
                    <CarouselItem key={index} className="basis-1/4 pl-12 py-2">
                      <div
                        key={index}
                        className="flex flex-col justify-between h-full items-center gap-2 shadow-sm border-2 border-gray-200 gradientgreen rounded-2xl p-6"
                      >
                        <Image
                          src={module.img}
                          width={130}
                          height={130}
                          alt="module1"
                          className="rounded-[50%] object-cover box-content h-[130px] border-4 border-green-50 shadow-xl"
                        />
                        <p className="text-center text-xl font-bold px-4 py-2 text-gray-700 drop-shadow-md">
                          {module.topic}
                        </p>
                        <button className="text-center shadow-md text-base font-bold p-2 px-6 rounded-3xl bg-green-500 text-green-50">
                          Подробнее
                        </button>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
