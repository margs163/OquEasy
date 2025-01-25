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
import NewsBar from "./ui/newsBar";

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

  const news = [
    {
      date: "September 2024",
      content:
        "Студент завоевал золото на Азиатской Олимпиаде по Программированию 2025, преуспев в алгоритмах и структурах данных, изученных на нашей платформе.",
      link: "#",
    },
    {
      date: "November 2024",
      content:
        "Студент нашей платформы занял первое место на Международной Олимпиаде по Программированию 2025, продемонстрировав непревзойденные навыки программирования и решения задач.",
      link: "#",
    },
    {
      date: "December 2024",
      content:
        "Наш студент занял первое место в престижном Азиатском Математическом Кодинг-Челлендже, продемонстрировав мастерство в алгоритмах и логике.",
      link: "#",
    },
  ];

  const testims = [
    {
      name: "Алина Соколова",
      opinion:
        "Отличный выбор курсов и интуитивно понятная платформа. Настоятельно рекомендую всем, кто хочет расширить свои навыки.",
      img: "/girl1.jpg",
    },
    {
      name: "Илья Романов",
      opinion:
        "Удобный интерфейс делает обучение приятным. Разнообразная программа охватывает актуальные темы. Определенно стоит своих денег.",
      img: "/boy1.jpg",
    },
    {
      name: "Дарья Коваленко",
      opinion:
        "Комплексные курсы, проводимые экспертами отрасли. Гибкие варианты расписания подходят для моего насыщенного образа жизни.",
      img: "/girl2.jpg",
    },
    {
      name: "Артем Зайцев",
      opinion:
        "Бесперебойный процесс обучения от начала до конца. Широкий выбор предметов на выбор. Превзошел мои ожидания во всех отношениях.",
      img: "/boy2.jpg",
    },
  ];

  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col my-12 gap-32">
        <section className="grid grid-cols-[0.6fr_0.6fr] gap-4 items-center max-w-[1200px] mx-auto">
          <div className=" col-start-1 col-end-1 flex justify-center items-center flex-col gap-16 ml-4">
            <div className="flex justify-center items-start flex-col gap-4">
              <h1 className="text-7xl font-extrabold tracking-[-0.1rem] uppercase leading-[1.1] text-gray-700 drop-shadow-md">
                Решай Олимпиадные <span className="text-green-600">Задачи</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Изучайте структуры данных и алгоритмы для эффективного решения
                олимпиадных задач. Учитесь, изучая основные алгоритмы и
                структуры данных.
              </p>
            </div>
            <div className="self-start flex gap-6">
              <button className="text-white bg-green-500 py-4 px-6 rounded-3xl text-xl font-medium">
                Начать
              </button>
              <button className="text-green-500 bg-white py-4 px-6 rounded-3xl text-xl font-medium border-[2px] border-green-500">
                Подробнее
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
            <h2 className="text-center text-4xl text-gray-700 font-semibold drop-shadow-xl">
              Мы Заботимся o Наших{" "}
              <span className="text-green-600">Студентах</span>
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
        <section className="max-w-[1200px] mx-auto flex flex-col gap-10">
          {/* <div className="flex mx-auto py-6 pb-0">
            <h3 className="text-3xl text-gray-700 font-bold rounded-xl">
              Course Modules
            </h3>
          </div> */}
          <div>
            <h2 className="text-center text-4xl text-gray-700 font-semibold drop-shadow-xl">
              Наш Курс Состоит из <span className="text-green-600">10+</span>{" "}
              Модулей с <span className="text-green-600">40+</span> Сложными
              Задачами
            </h2>
          </div>
          <div className="p-6 flex flex-col gap-12 px-16 rounded-xl ">
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
        <section className="grid grid-cols-[0.3fr_0.6fr] gap-10 justify-between items-center max-w-[1200px] mx-auto">
          <div className="flex flex-col justify-start items-start h-full gap-4">
            <h2 className="text-5xl font-extrabold text-gray-800 max-w-[50px]">
              Последние Новости
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              Узнайте последние новости на сайте. Этот раздел предоставляет
              информацию о всех актуальных новостях.
            </p>
            <button className="text-xl font-medium mt-20 text-green-500 border-2 border-green-500 rounded-3xl px-4 py-4">
              Узнать Больше
            </button>
          </div>
          <div className="flex flex-col items-stretch gap-4">
            {news.map((item, index) => {
              return (
                <NewsBar
                  key={index}
                  date={item.date}
                  content={item.content}
                  link={item.link}
                />
              );
            })}
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
