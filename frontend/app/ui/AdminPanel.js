import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import {
  FileText,
  FileVideo,
  Folder,
  Pen,
  Trash
} from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminPanel({
  onDeleteTopic,
  searchText,
  setSearchText,
  renderAgain,
  setRenderAgain,
}) {
  const [topics, setTopics] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [presentAdded, setPresentAdded] = useState(false);
  const [editTopic, setEditTopic] = useState({
    heading: "",
    fileMarkdown: null,
    filePresent: null,
    fileVideo: "",
    editingVideo: "",
  });

  const filteredTopics =
    topics &&
    topics.filter((item) => {
      if (!searchText) {
        return true;
      }
      return item.topic_name.toLowerCase().includes(searchText.toLowerCase());
    });

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("http://localhost:8000/api/topic");
        if (!response.ok) {
          console.error("Could not fetch topics.");
        }
        const data = await response.json();
        const decodedData = data.data.map((item) => {
          item.content_rel.topic_content = JSON.parse(
            item.content_rel.topic_content
          );
          return item;
        });
        setTopics(decodedData);
        console.log(decodedData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTopics();
  }, [renderAgain]);

  function handleInput(e) {
    setEditTopic((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function fetchCurrentEditingTopic(topic_name) {
    try {
      const response = await fetch(`http://localhost:8000/api/topic/${topic_name}`);
      if (!response.ok) {
        console.error("could not request a topic content");
      }
      const data = await response.json();

      const presentation = data.data.content_rel.presentations;
      const video = data.data.content_rel.videos;
      const decodedContent = JSON.parse(data.data.content_rel.topic_content);
      const topic = data.data.topic_name;
      const module = data.data.topic_module.module_name;
      const heading = decodedContent.mainHeading;

      const setObj = {
        heading: heading,
        fileMarkdown: "ContentTheory.txt",
        filePresent: presentation,
        fileVideo: video,
        editingVideo: "",
        topic_name: topic,
        module_name: module,
      };

      setEditTopic(setObj);
    } catch (e) {
      console.error(e);
    }
  }

  function handleFileChange(e) {
    setEditTopic((prev) => {
      setPresentAdded(true);
      return {
        ...prev,
        [e.target.name]: prev.filePresent.push({
          fileObj: e.target.files[0],
          presentation_path: e.target.files[0].name,
        }),
      };
    });
  }

  async function handleDeletion(topic_name) {
    await onDeleteTopic(topic_name);
    setRenderAgain((prev) => !prev);
    // setTopics((prev) => {
    //   const filteredTopics = prev.filter((item) => {
    //     if (item.topic_name !== topic_name) {
    //       return true;
    //     }
    //   });
    //   return filteredTopics;
    // });
  }

  async function onEditSubmit(e, topic_name) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/content/text/${topic_name}?` +
          new URLSearchParams({
            heading: editTopic.heading,
            delete_content: false,
          }),
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        console.error("Could not edit a topic");
      }
      const data = await response.json();
      console.log(data);

      if (presentAdded) {
        const formDataPresentation = new FormData();
        formDataPresentation.append(
          "topic_presentation",
          editTopic.filePresent.at(-1).fileObj
        );

        const responsePresent = await fetch(
          `http://localhost:8000/api/content/presentation/${topic_name}?` +
            new URLSearchParams({
              module_name: editTopic.module_name,
              video_link: editTopic.editingVideo,
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
      } else if (editTopic.editingVideo) {
        const responseVideo = await fetch(
          `http://localhost:8000/api/content/presentation/${topic_name}?` +
            new URLSearchParams({
              module_name: editTopic.module_name,
              video_link: editTopic.editingVideo,
            }),
          {
            method: "POST",
          }
        );
        if (!responseVideo.ok) {
          throw Error("Could not make present request.");
        }
        const dataVideo = await responseVideo.json();
        console.log(dataVideo);
      }

      setEditDialogOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeletePresentation(topic_name, file_name) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/content/presentation/${topic_name}/${file_name}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.error("Could not edit a topic");
      }
      const data = await response.json();
      console.log(data);
      setEditTopic((prev) => {
        return {
          ...prev,
          filePresent: prev.filePresent.filter((item) => {
            const itemFileName = item.presentation_path.split("/").pop();
            return itemFileName !== file_name;
          }),
        };
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeleteVideo(topic_name, video_link) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/content/video/${topic_name}?` +
          new URLSearchParams({
            video_link: video_link,
          }),
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.error("Could not edit a topic");
      }
      const data = await response.json();
      console.log(data);
      setEditTopic((prev) => {
        return {
          ...prev,
          fileVideo: prev.fileVideo.filter((item) => {
            const itemFileName = item.video_path;
            return !itemFileName.includes(video_link);
          }),
        };
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-6 pb-6 px-2 md:px-0">
      {filteredTopics.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-between gap-8 w-full border border-gray-200 rounded-lg p-4 shadow"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">{`${
                item.topic_name[0].toUpperCase() + item.topic_name.slice(1)
              }`}</h3>
              <div className="flex gap-2">
                <Folder size={20} />
                <p className="text-sm">2 Файла</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Изменено 15 мин назад</p>
              <div className="flex items-center gap-2">
                <Dialog
                  className="bg-transparent"
                  onOpenChange={(isOpen) => {
                    if (isOpen) {
                      fetchCurrentEditingTopic(item.topic_name);
                    }
                  }}
                >
                  <DialogTrigger>
                    <Pen className=" size-5 cursor-pointer text-gray-700" />
                  </DialogTrigger>
                  <DialogContent className="max-w-[350px] bg-white rounded-lg">
                    <DialogHeader className={"flex justify-start text-start"}>
                      <DialogTitle>Изменить Тему</DialogTitle>
                      <DialogDescription>
                        Делай изменения для темы и теории. Добавляй и удаляй
                        презентации для тем.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => onEditSubmit(e, editTopic.topic_name)}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="heading"
                          className=" text-gray-700 text-sm"
                        >
                          Заголовок Теории
                        </label>
                        <input
                          onChange={handleInput}
                          value={editTopic.heading}
                          id="heading"
                          name="heading"
                          placeholder="Enter topic heading..."
                          className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-gray-700 text-sm">
                          Доступные Ресурсы
                        </label>
                        <div className="flex flex-col gap-4">
                          {editTopic.filePresent &&
                            editTopic.filePresent.map((itemChild, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-col gap-4"
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex gap-4 items-center">
                                      <div>
                                        <FileText
                                          size={22}
                                          className="box-content p-2 text-indigo-500 bg-slate-100 rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <h3 className="text-base font-medium">
                                          {itemChild.presentation_path
                                            .split("/")
                                            .at(-1)[0]
                                            .toUpperCase() +
                                            itemChild.presentation_path
                                              .split("/")
                                              .at(-1)
                                              .slice(1)}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                          PDF • 8 min read
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg p-2 box-content">
                                      <Trash
                                        size={16}
                                        onClick={() =>
                                          handleDeletePresentation(
                                            editTopic.topic_name,
                                            itemChild.presentation_path
                                              .split("/")
                                              .at(-1)
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  {/* <hr className="w-full h-[2px] bg-gray-100" /> */}
                                </div>
                              );
                            })}
                          {editTopic.fileVideo &&
                            editTopic.fileVideo.map((itemChild, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-col gap-4"
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex gap-4 items-center">
                                      <div>
                                        <FileVideo
                                          size={22}
                                          className="box-content p-2 text-indigo-500 bg-slate-100 rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <h3 className="text-base font-medium">
                                          {itemChild.video_path.slice(0, 10)}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                          Video • 10 min watch
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg p-2 box-content">
                                      <Trash
                                        size={16}
                                        onClick={() =>
                                          handleDeleteVideo(
                                            editTopic.topic_name,
                                            itemChild.video_path
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  {/* <hr className="w-full h-[2px] bg-gray-100" /> */}
                                </div>
                              );
                            })}
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                              <div className="flex gap-4 items-center">
                                <div>
                                  <FileText
                                    size={22}
                                    className="box-content p-2 text-indigo-500 bg-slate-100 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-base font-medium">
                                    {editTopic.fileMarkdown}
                                  </h3>
                                  <p className="text-xs text-gray-500 font-medium">
                                    PDF • 8 min read
                                  </p>
                                </div>
                              </div>
                              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg p-2 box-content">
                                <Trash size={16} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="filePresentation"
                          className=" text-gray-700 text-sm"
                        >
                          Презентации
                        </label>
                        <input
                          onChange={handleFileChange}
                          id="filePresentation"
                          name="filePresentation"
                          type="file"
                          accept=".ptx, .pdf, .pptx"
                          className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="editingVideo"
                          className=" text-gray-700 text-sm"
                        >
                          Видео
                        </label>
                        <input
                          onChange={handleInput}
                          value={editTopic.editingVideo}
                          placeholder="Enter a video link..."
                          id="editingVideo"
                          name="editingVideo"
                          type="text"
                          className="border border-gray-200 text-sm px-4 py-2 rounded-lg"
                        />
                      </div>
                      <div className="flex self-end gap-3 justify-start mt-4">
                        <DialogClose asChild>
                          <button className="bg-gray-400 px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-gray-500">
                            Отменить
                          </button>
                        </DialogClose>
                        <DialogClose asChild>
                          <button
                            type="submit"
                            className="bg-gray-800 px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-gray-900"
                          >
                            Создать
                          </button>
                        </DialogClose>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Trash
                  onClick={() => handleDeletion(item.topic_name)}
                  className="size-5 cursor-pointer text-gray-700"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
