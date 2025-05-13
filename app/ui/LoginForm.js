"use client";

import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ children }) {
  const [formValues, setFormValues] = useState({
    email: "",
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

    const response = await fetch("http://localhost:8000/auth/jwt/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: formValues.email,
        password: formValues.password,
      }),
    });

    console.log(response.headers);

    // const data = await response.json();

    if (response.ok) {
      router.push("/course");
      console.log("Registration completed succesfully!");
    } else {
      alert("Registration failed!");
    }
  }

  return (
    <div className="text-gray-800 text- flex flex-col gap-16 rounded-r-lg border-[1px] border-gray-200 p-10 bg-white">
      <h2 className="text-3xl font-extrabold text-center">Login</h2>
      <form onSubmit={handleSubmition} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-500"
            >
              Email
            </label>
            <div className="flex gap-2 items-center px-2 border-b-2 border-b-gray-300 pb-3 pt-2 focus-within:border-b-violet-500">
              <User size={18} className=" text-gray-400" />
              <input
                className="outline-none text-gray-600 text-[0.8rem]"
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
              htmlFor="password"
              className="text-xs font-medium text-neutral-500"
            >
              Password
            </label>
            <div className="flex gap-2 items-center px-2 border-b-2 border-b-gray-300 pb-3 pt-2 focus-within:border-b-violet-500">
              <Lock size={18} className="text-gray-400" />
              <input
                className="outline-none text-gray-600 text-[0.8rem]"
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
          LOGIN
        </button>
        {children}
        <div className="text-center mt-12">
          <p className="text-xs font-medium text-neutral-500">
            Dont have an account yet?
          </p>
          <Link
            className="text-xs font-medium text-neutral-500"
            href={"/register"}
          >
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
}
