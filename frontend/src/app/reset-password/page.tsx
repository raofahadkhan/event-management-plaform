import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F8F8FA] gap-7">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold leading-[43.67px]">
          {/* Let&apos;s Change Your Password */}
          RESET PASSWORD
        </h1>
      </div>
      <div className="w-[90%] md:w-1/2 lg:w-1/3">
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="password" value="Password" />
            <Input name="password" type="password" placeholder="Enter your Password" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="confirm-password" value="Confirm Password" />
            <Input name="confirm-password" type="password" placeholder="Enter your Password" />
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
