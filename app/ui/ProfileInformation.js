import { Pencil } from "lucide-react";
import { useState } from "react";

export default function ProfileInformation({
  isEditing,
  setIsEditing,
  formData,
  setFormData,
  onFormSubmit,
}) {
  function handleOnChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="flex flex-col justify-start items-start border border-gray-200 rounded-xl p-4 w-full gap-4 lg:p-6">
      <div className="flex justify-between w-full">
        <div>
          <h3 className="text-lg font-medium lg:text-xl">
            Personal Information
          </h3>
        </div>
        <div className="border rounded-xl border-gray-200 p-1 px-3">
          <button
            className="text-xs flex items-center gap-1 lg:text-base"
            onClick={() => setIsEditing(true)}
          >
            Edit
            <Pencil className="pt-[2px] box-content lg:size-3.5 size-2.5" />
          </button>
        </div>
      </div>
      <form
        onSubmit={onFormSubmit}
        className="grid grid-cols-2 gap-x-10 gap-y-4 justify-items-start items-start px-2 lg:gap-x-48 lg:gap-y-6"
      >
        <div className="flex flex-col items-start gap-1">
          <label className="text-gray-500 text-[0.8rem] lg:text-sm">
            First Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleOnChange}
              required
              className="lg:w-32 w-20 text-sm lg:text-base border p-1 px-2 lg:p-2 lg:px-4 rounded-lg border-gray-200"
            />
          ) : (
            <h3 className="text-sm lg:text-base">{formData.firstName}</h3>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-[0.8rem] lg:text-sm">
            Last Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleOnChange}
              required
              className="lg:w-32 w-20 text-sm lg:text-base border p-1 px-2 lg:p-2 lg:px-4 rounded-lg border-gray-200"
            />
          ) : (
            <h3 className="text-sm lg:text-base">{formData.lastName}</h3>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-[0.8rem] lg:text-sm">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              required
              className="lg:w-32 w-28 text-sm lg:text-base border p-1 px-2 lg:p-2 lg:px-4 rounded-lg border-gray-200"
            />
          ) : (
            <h3 className="text-sm lg:text-base">{formData.email}</h3>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-[0.8rem] lg:text-sm">Bio</label>
          {isEditing ? (
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleOnChange}
              required
              className="lg:w-32 w-28 text-sm lg:text-base border p-1 px-2 lg:p-2 lg:px-4 rounded-lg border-gray-200"
            />
          ) : (
            <h3 className="text-sm lg:text-base">{formData.bio}</h3>
          )}
        </div>
      </form>
    </div>
  );
}
