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
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import AdminPanel from "../ui/AdminPanel";

export default function Page() {
  const isMobile = useIsMobile();
  const [currentTab, setCurrentTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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
          email: data["last_name"],
        });

        setFormData((prev) => {
          return {
            ...prev,
            firstName: data["first_name"],
            lastName: data["last_name"],
            email: data["last_name"],
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
                <h3 className="font-bold text-2xl text-gray-800">
                  Admin Panel
                </h3>
                <AdminPanel />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
