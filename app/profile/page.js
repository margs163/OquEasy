"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.jsx";
import { useIsMobile } from "@/hooks/use-mobile";
import MainInformation from "../ui/MainInformation";
import ProfileInformation from "../ui/ProfileInformation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Search } from "lucide-react";
import { useEffect, useState } from "react";
import AdminPanel from "../ui/AdminPanel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import CreateTopic from "../ui/CreateTopic";

export default function Page() {
  const isMobile = useIsMobile();
  const [currentTab, setCurrentTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [renderAgain, setRenderAgain] = useState(false);
  const [createTopic, setCreateTopic] = useState({
    moduleName: "c",
    topicName: "",
    modulePlainName: "",
    topicPlainName: "",
    heading: "",
    fileMarkdown: null,
    filePresentation: null,
    fileVideo: "",
  });
  const [formData, setFormData] = useState({
    firstName: "Daniyal",
    lastName: "Aldanov",
    email: "damn@example.com",
    bio: "Student at NIS",
  });
  const [fetchData, setFetchData] = useState({
    firstName: "Daniyal",
    lastName: "Aldanov",
    email: "damn@example.com",
    bio: "Student at NIS",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          credentials: "include",
        });
        if (!response.ok) {
          alert("You might unauthorized or an external error happened.");
        }

        const data = await response.json();

        setFetchData({
          firstName: data["first_name"],
          lastName: data["last_name"],
          email: data["email"],
        });

        setFormData((prev) => {
          return {
            ...prev,
            firstName: data["first_name"],
            lastName: data["last_name"],
            email: data["email"],
          };
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      onFormSubmit();
      setFormSubmitted((prev) => false);
    }
  }, [formSubmitted]);

  function handleSelectChange(value) {
    setCreateTopic((prev) => {
      return {
        ...prev,
        moduleName: value,
      };
    });
  }

  function handleInput(e) {
    setCreateTopic((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleFileChange(e) {
    setCreateTopic((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files[0],
      };
    });
  }

  async function onCreateTopic(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          module_name: createTopic.moduleName,
          topic_name: createTopic.topicName,
        }),
      });
      if (!response.ok) {
        throw Error("could not create topic");
      }

      const data = await response.json();
      console.log(data);

      const formDataText = new FormData();
      formDataText.append("topic_content", createTopic.fileMarkdown);
      const responseText = await fetch(
        `http://localhost:8000/content/text/${createTopic.topicName}?` +
          new URLSearchParams({
            module_name: createTopic.moduleName,
            heading: createTopic.heading,
            plain_module: createTopic.modulePlainName,
            plain_topic: createTopic.topicPlainName,
          }),
        {
          method: "POST",
          body: formDataText,
        }
      );
      if (!responseText.ok) {
        throw Error("could not make text request.");
      }

      const dataText = await responseText.json();
      console.log(dataText);

      const formDataPresentation = new FormData();
      formDataPresentation.append(
        "topic_presentation",
        createTopic.filePresentation
      );

      const responsePresent = await fetch(
        `http://localhost:8000/content/presentation/${createTopic.topicName}?` +
          new URLSearchParams({
            module_name: createTopic.moduleName,
            video_link: createTopic.fileVideo,
          }),
        {
          method: "POST",
          body: formDataPresentation,
        }
      );
      if (!responsePresent.ok) {
        throw Error("Could not make present request.");
      }
      const dataPresent = await responsePresent.json();
      console.log(dataPresent);
    } catch (error) {
      console.error(error);
    }
    setRenderAgain((prev) => !prev);
  }

  async function onDeleteTopic(topic_name) {
    try {
      const response = await fetch(
        `http://localhost:8000/topic/${topic_name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("could not make request for deletion!");
      }

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function onFormSubmit() {
    try {
      const response = await fetch("http://localhost:8000/users/me", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      });
      if (!response.ok) {
        alert("You might unauthorized or an external error happened.");
      }

      const data = await response.json();

      setFetchData({
        firstName: data["first_name"],
        lastName: data["last_name"],
        email: data["last_name"],
      });
    } catch (error) {
      console.error(error);
    }
  }

  const tabs = [
    {
      value: "profile",
      displayName: "My Profile",
    },
    {
      value: "admin",
      displayName: "Admin Panel",
    },
  ];

  return (
    <div className="bg-slate-100 h-screen">
      {isMobile ? (
        <Tabs defaultValue="profile" className="">
          <TabsList className=" py-8 px-4 lg:py-8 flex justify-start lg:justify-start items-center gap-2 lg:gap-4 text-gray-700">
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
          </TabsList>
          <TabsContent value="profile" className="mx-4 bg-white">
            <Card className=" rounded-xl">
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 p-4 pb-6 pt-0">
                <MainInformation formData={fetchData} />
                <ProfileInformation
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  formData={formData}
                  setFormData={setFormData}
                  onFormSubmit={onFormSubmit}
                />
                <button
                  className="text-xs lg:text-sm p-2 px-3 rounded-xl lg:p-3 lg:px-4 lg:rounded-2xl border border-gray-200 self-end disabled:bg-gray-100 disabled:text-gray-500 mt-4"
                  onClick={() => {
                    setIsEditing(false);
                    setFormSubmitted(true);
                  }}
                  type="submit"
                  disabled={isEditing ? false : true}
                >
                  Save Changes
                </button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="admin" className="mx-4 bg-white">
            <Card className=" rounded-xl">
              <CardHeader>
                <CardTitle>Admin Panel</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-8 p-4 pb-6 pt-0">
                <div className="px-2 flex justify-between items-center gap-4 w-full">
                  <div className="border border-gray-200 rounded-lg flex items-center p-1 px-2">
                    <Search size={16} className="text-gray-600" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search topics..."
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      className="focus:outline-none pl-2 w-40"
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-emerald-500 px-4 py-2 rounded-lg text-white font-medium">
                        + New
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[350px] bg-white rounded-lg">
                      <DialogHeader className={"flex justify-start text-start"}>
                        <DialogTitle>Create a New Topic</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => onCreateTopic(e)}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="module-select"
                            className="text-gray-700 text-sm"
                          >
                            Module
                          </label>
                          <select
                            onChange={handleSelectChange}
                            id="module-select"
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg bg-white"
                            name="moduleName"
                            defaultValue={"c"}
                          >
                            <option value={"c"}>
                              Основы Программирования на C++
                            </option>
                            <option value={"greedy"}>Жадные алгоритмы</option>
                            <option value={"search"}>Поиски</option>
                            <option value={"graphs"}>Графы</option>
                            <option value={"trees"}>Деревья</option>
                            <option value={"sparse"}>
                              Разреженные таблицы
                            </option>
                            <option value={"dp"}>
                              Динамическое Программирование
                            </option>
                            <option value={"trie"}>Бор (Trie)</option>
                            <option value={"string-hashing"}>
                              Хэширование Строк
                            </option>
                            <option value={"mo-algorithm"}>Алгоритм Mo</option>
                            <option value={"facts"}>Интересные факты</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="topic-name"
                            className=" text-gray-700 text-sm"
                          >
                            Topic (must start with module)
                          </label>
                          <input
                            onChange={handleInput}
                            value={createTopic.topicName}
                            placeholder="Enter topic..."
                            id="topic-name"
                            name="topicName"
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="module-plain-name"
                            className=" text-gray-700 text-sm"
                          >
                            Module name
                          </label>
                          <input
                            onChange={handleInput}
                            value={createTopic.modulePlainName}
                            id="module-plain-name"
                            name="modulePlainName"
                            placeholder="Enter module name..."
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="topic-plain-name"
                            className=" text-gray-700 text-sm"
                          >
                            Topic name
                          </label>
                          <input
                            onChange={handleInput}
                            value={createTopic.topicPlainName}
                            id="topic-plain-name"
                            name="topicPlainName"
                            placeholder="Enter topic plain name..."
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="heading"
                            className=" text-gray-700 text-sm"
                          >
                            Content Heading
                          </label>
                          <input
                            onChange={handleInput}
                            value={createTopic.heading}
                            id="heading"
                            name="heading"
                            placeholder="Enter topic heading..."
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="fileMarkdown"
                            className=" text-gray-700 text-sm"
                          >
                            Theory Markdown
                          </label>
                          <input
                            onChange={handleFileChange}
                            id="fileMarkdown"
                            name="fileMarkdown"
                            type="file"
                            accept=".txt, .md, .docx"
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="filePresentation"
                            className=" text-gray-700 text-sm"
                          >
                            Presentation
                          </label>
                          <input
                            onChange={handleFileChange}
                            id="filePresentation"
                            name="filePresentation"
                            type="file"
                            accept=".ptx, .pdf, .pptx"
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="fileVideo"
                            className=" text-gray-700 text-sm"
                          >
                            Видео
                          </label>
                          <input
                            onChange={handleInput}
                            value={createTopic.fileVideo}
                            id="fileVideo"
                            name="fileVideo"
                            type="text"
                            className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                            placeholder="Enter a video link..."
                          />
                        </div>
                        <div className="flex self-end gap-3 justify-start mt-4">
                          <DialogClose asChild>
                            <button className="bg-gray-400 px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-gray-500">
                              Cancel
                            </button>
                          </DialogClose>
                          <DialogClose asChild>
                            <button
                              type="submit"
                              className="bg-gray-800 px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-gray-900"
                            >
                              Create
                            </button>
                          </DialogClose>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <AdminPanel
                  onDeleteTopic={onDeleteTopic}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  renderAgain={renderAgain}
                  setRenderAgain={setRenderAgain}
                />
                <button
                  className="text-xs lg:text-sm p-2 px-3 rounded-xl lg:p-3 lg:px-4 lg:rounded-2xl border border-gray-200 self-end disabled:bg-gray-100 disabled:text-gray-500 mt-4"
                  onClick={() => {
                    setIsEditing(false);
                    setFormSubmitted(true);
                  }}
                  type="submit"
                  disabled={isEditing ? false : true}
                >
                  Save Changes
                </button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="p-8">
          <div className="grid grid-cols-[0.113fr_0.89fr] border border-gray-200 p-6 rounded-3xl bg-white justify-items-start items-start gap-2 shadow-sm">
            <div className="col-start-1 col-end-1">
              <ul className="flex flex-col gap-2 justify-center items-start">
                {tabs.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`px-4 py-3 ${
                        currentTab === item.value
                          ? "bg-blue-100 text-blue-500 drop-shadow-sm"
                          : "text-gray-600 bg-transparent"
                      } rounded-3xl text-left text-sm font-medium cursor-pointer`}
                      onClick={() => setCurrentTab(item.value)}
                    >
                      {item.displayName}
                    </li>
                  );
                })}
                <li className="p-3 rounded-3xl text-red-500 text-center font-medium cursor-pointer mt-3">
                  Delete Account
                </li>
              </ul>
            </div>
            {currentTab === "profile" ? (
              <div className="col-start-2 col-end-2 border-l border-gray-200 pl-10 pr-4 flex flex-col gap-6 w-full items-start">
                <h3 className="font-bold text-2xl text-gray-800">My Profile</h3>
                <MainInformation formData={fetchData} />
                <ProfileInformation
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  formData={formData}
                  setFormData={setFormData}
                  onFormSubmit={onFormSubmit}
                />
                <button
                  className="text-sm p-3 px-4 rounded-2xl border border-gray-200 self-end disabled:bg-gray-100 disabled:text-gray-500 mt-8"
                  disabled={isEditing ? false : true}
                  onClick={() => {
                    setIsEditing(false);
                    setFormSubmitted(true);
                  }}
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="col-start-2 col-end-2 border-l border-gray-200 pl-10 pr-4 flex flex-col gap-6 w-full items-start">
                <div>
                  <CardTitle>Admin Panel</CardTitle>
                </div>
                <div className="flex flex-col items-start gap-8 p-4 pb-6 pt-0 w-full">
                  <div className="px-2 flex justify-between items-center gap-4 w-full">
                    <div className="border border-gray-200 rounded-lg flex items-center p-1 px-2">
                      <Search size={16} className="text-gray-600" />
                      <input
                        type="text"
                        name="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search topics..."
                        className="focus:outline-none pl-2 w-40"
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="bg-emerald-500 px-4 py-2 rounded-lg text-white font-medium">
                          + New
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[350px] lg:max-w-[500px] bg-white rounded-lg">
                        <DialogHeader
                          className={"flex justify-start text-start"}
                        >
                          <DialogTitle>Create a New Topic</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => onCreateTopic(e)}
                          className="flex flex-col gap-4 w-full"
                        >
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="module-select"
                              className="text-gray-700 text-sm"
                            >
                              Module
                            </label>
                            <select
                              onChange={handleSelectChange}
                              id="module-select"
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg bg-white"
                              name="moduleName"
                              defaultValue={"c"}
                            >
                              <option value={"c"}>
                                Основы Программирования на C++
                              </option>
                              <option value={"greedy"}>Жадные алгоритмы</option>
                              <option value={"search"}>Поиски</option>
                              <option value={"graphs"}>Графы</option>
                              <option value={"trees"}>Деревья</option>
                              <option value={"sparse"}>
                                Разреженные таблицы
                              </option>
                              <option value={"dp"}>
                                Динамическое Программирование
                              </option>
                              <option value={"trie"}>Бор (Trie)</option>
                              <option value={"string-hashing"}>
                                Хэширование Строк
                              </option>
                              <option value={"mo-algorithm"}>
                                Алгоритм Mo
                              </option>
                              <option value={"facts"}>Интересные факты</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="topic-name"
                              className=" text-gray-700 text-sm"
                            >
                              Topic (must start with module)
                            </label>
                            <input
                              onChange={handleInput}
                              value={createTopic.topicName}
                              placeholder="Enter topic..."
                              id="topic-name"
                              name="topicName"
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="module-plain-name"
                              className=" text-gray-700 text-sm"
                            >
                              Module name
                            </label>
                            <input
                              onChange={handleInput}
                              value={createTopic.modulePlainName}
                              id="module-plain-name"
                              name="modulePlainName"
                              placeholder="Enter module name..."
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="topic-plain-name"
                              className=" text-gray-700 text-sm"
                            >
                              Topic name
                            </label>
                            <input
                              onChange={handleInput}
                              value={createTopic.topicPlainName}
                              id="topic-plain-name"
                              name="topicPlainName"
                              placeholder="Enter topic plain name..."
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="heading"
                              className=" text-gray-700 text-sm"
                            >
                              Content Heading
                            </label>
                            <input
                              onChange={handleInput}
                              value={createTopic.heading}
                              id="heading"
                              name="heading"
                              placeholder="Enter topic heading..."
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="fileMarkdown"
                              className=" text-gray-700 text-sm"
                            >
                              Theory Markdown
                            </label>
                            <input
                              onChange={handleFileChange}
                              id="fileMarkdown"
                              name="fileMarkdown"
                              type="file"
                              accept=".txt, .md, .docx"
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="filePresentation"
                              className=" text-gray-700 text-sm"
                            >
                              Presentation
                            </label>
                            <input
                              onChange={handleFileChange}
                              id="filePresentation"
                              name="filePresentation"
                              type="file"
                              accept=".ptx, .pdf, .pptx"
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="fileVideo"
                              className=" text-gray-700 text-sm"
                            >
                              Видео
                            </label>
                            <input
                              onChange={handleInput}
                              value={createTopic.fileVideo}
                              id="fileVideo"
                              name="fileVideo"
                              type="text"
                              className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                              placeholder="Enter a video link..."
                            />
                          </div>
                          <div className="flex self-end gap-3 justify-start mt-4">
                            <DialogClose asChild>
                              <button className="bg-gray-400 px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-gray-500">
                                Cancel
                              </button>
                            </DialogClose>
                            <DialogClose asChild>
                              <button
                                type="submit"
                                className="bg-gray-800 px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-gray-900"
                              >
                                Create
                              </button>
                            </DialogClose>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <AdminPanel
                    onDeleteTopic={onDeleteTopic}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    renderAgain={renderAgain}
                    setRenderAgain={setRenderAgain}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
