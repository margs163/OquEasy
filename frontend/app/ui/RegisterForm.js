"use client";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm({ children }) {
  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmition(e) {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.password,
      }),
    });

    if (response.ok) {
      router.push("/login");
      console.log("Registration completed succesfully!");
    } else {
      alert("Registration failed!");
    }
  }
  return (
    <div className="text-gray-800 text- flex flex-col gap-10 rounded-r-lg border-[1px] border-gray-200 p-10 bg-white">
      <h2 className="text-3xl font-extrabold text-center">Sign Up</h2>
      <form onSubmit={handleSubmition} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-500"
            >
              Email
            </label>
            <div className="flex gap-2 items-center px-2 border-b-2 border-b-gray-300 pb-3 pt-2 transition-all focus-within:border-b-violet-500">
              <User size={18} className=" text-gray-400" />
              <input
                className="outline-none text-gray-600 text-sm"
                id="email"
                name="email"
                placeholder="Type your email"
                type="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-xs font-medium text-neutral-500"
            >
              First Name
            </label>
            <div className="flex gap-2 items-center px-2 border-b-2 border-b-gray-300 pb-3 pt-2 transition-all focus-within:border-b-violet-500">
              <User size={18} className=" text-gray-400" />
              <input
                className="outline-none text-gray-600 text-sm"
                id="firstName"
                name="firstName"
                placeholder="Type your first name"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-xs font-medium text-neutral-500"
            >
              Last Name
            </label>
            <div className="flex gap-2 items-center px-2 border-b-2 border-b-gray-300 pb-3 pt-2 transition-all focus-within:border-b-violet-500">
              <User size={18} className=" text-gray-400" />
              <input
                className="outline-none text-gray-600 text-sm"
                id="lastName"
                name="lastName"
                placeholder="Type your last name"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-xs font-medium text-neutral-500"
            >
              Password
            </label>
            <div className="flex gap-2 items-center px-2 border-b-2 border-b-gray-300 pb-3 pt-2 transition-all focus-within:border-b-violet-500">
              <Lock size={18} className="text-gray-400" />
              <input
                className="outline-none text-gray-600 text-sm"
                id="password"
                name="password"
                placeholder="Type your password"
                type="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <Link
            href={"/recover"}
            className=" self-end text-[0.7rem] font-medium text-neutral-500"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="button-gradient tracking-wide text-white text-sm font-semibold py-2 rounded-3xl"
        >
          SIGN UP
        </button>
        {children}
        {/* <div className="text-center mt-16"></div> */}
      </form>
    </div>
  );
}
