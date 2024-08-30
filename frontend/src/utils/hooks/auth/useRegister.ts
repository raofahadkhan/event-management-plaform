import { RegisterFunc } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const resgisterUserBody = { name, email, password, role: "user" };
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resgisterUserBody)
        }
      );
      let parsedResponse = await response.json()
      if (response.ok) {
        toast.success("User Created Successfully")
      } else {
        toast.error(`${(parsedResponse as unknown as { error: string }).error}`)
      }

    } catch (error) {
      toast.error("Error Creating User")
    } finally {
      setLoading(false);
    }
  };

  return {loading, register}
};

export default useRegister;
