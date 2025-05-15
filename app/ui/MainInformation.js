import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function MainInformation({ formData }) {
  return (
    <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 lg:p-6 w-full">
      <div className="flex gap-3 justify-start items-center lg:gap-6">
        <Avatar className="w-[70px] h-[70px] lg:w-[110px] lg:h-[110px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <h3 className=" mb-0.5 lg:text-2xl text-gray-800 font-medium">
            {formData.firstName + " " + formData.lastName}
          </h3>
          <p className="text-sm  text-gray-700 leading-snug lg:text-base">
            {formData.bio}
          </p>
          <p className="text-xs text-gray-500 lg:text-sm">
            Pavlodar, Kazakhstan
          </p>
        </div>
      </div>
      <div className="border rounded-xl border-gray-200 py-1 px-3">
        <button className="text-xs flex items-center gap-1 lg:text-base">
          Edit
          <Pencil className="pt-[2px] box-content size-2.5 lg:size-3.5" />
        </button>
      </div>
    </div>
  );
}
