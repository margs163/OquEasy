import { Ellipsis, Folder } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("http://localhost:8000/topic");
        if (!response.ok) {
          alert("You might unauthorized or an external error happened.");
        }
        const data = await response.json();
        setTopics(data["data"]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTopics();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-6 pb-6">
      {topics.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-between gap-8 w-full border border-gray-200 rounded-lg p-4"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">{`${
                item.topic_name[0].toUpperCase() + item.topic_name.slice(1)
              }`}</h3>
              <div className="flex gap-2">
                <Folder size={20} />
                <p className="text-sm">2 Files</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Edited 15 mins ago</p>
              <Ellipsis />
            </div>
          </div>
        );
      })}
    </div>
  );
}
