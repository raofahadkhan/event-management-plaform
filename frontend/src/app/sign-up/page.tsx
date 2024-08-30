"use client"
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import useRegister from "@/utils/hooks/auth/useRegister";
import React from "react";

const Page = () => {
  const { register } = useRegister()
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F8F8FA] gap-3">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold leading-[43.67px]">
          Sign Up to <span className="text-[#784BFA]">Event Hive</span>
        </h1>
      </div>
      <div className="w-[90%] md:w-1/2 lg:w-1/3">
        <form onSubmit={async (e) => {
          e.preventDefault()
          await register("ashar", "ashar@gmail.com", "ashar.")
        }} className="flex flex-col gap-4">
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="name" value="Name" />
            <Input name="name" type="text" placeholder="Enter your name" />
          </div>

          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="email" value="Email" />
            <Input name="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="password" value="Password" />
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="confirm-password" value="Confirm Password" />
            <Input
              name="confirm-password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <input
            type="submit"
            className="w-full bg-[#784BFA] p-2 text-white rounded-md mt-2 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
