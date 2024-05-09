"use client";

import { ToastContainer, toast } from "react-toastify";
import { SparklesPreviewLogin } from "../home/SparklesPreviewLogin";
import { BackgroundGradient } from "../ui/background-gradient";
import BottomGradient from "../ui/BottomGradient";
import { SyncLoader } from "react-spinners";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

interface ILoginInput {
  userEmail: string;
  password: string;
}

const CreateUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginInput>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: ILoginInput) => {
    setIsLoading(true);
    fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === true) {
          // router.push("/admin");
          reset();
        } else {
          toast.error(data.error, {
            position: "top-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container p-4 mt-20 max-md:mt-28">
      <section className="bg-white relative ">
        <div className="h-screen lg:overflow-hidden ">
          <div className="h-full w-full  p-[1vh] container">
            <div className="flex max-lg:flex-col h-full w-full ">
              <div className="w-5/12 max-lg:w-full flex justify-center items-center">
                <SparklesPreviewLogin />
              </div>
              <div className="w-7/12 max-lg:w-full  p-[1vh] flex items-center justify-center lg:mx-24">
                <BackgroundGradient className="rounded-[22px] max-lg:w-full sm:p-10 bg-white dark:bg-zinc-900">
                  <div className=" w-full mx-auto rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 uppercase">
                      Create a user
                    </h2>
                    <form
                      className="my-8 w-full"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="userName">User Email*</Label>
                        <Input
                          id="text"
                          placeholder="Enter email address"
                          type="text"
                          {...register("userEmail", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          })}
                        />
                        {errors?.userEmail?.type === "required" && (
                          <span className="text-xs text-red-700">
                            Please provide a User Email
                          </span>
                        )}
                        {errors?.userEmail?.type === "pattern" && (
                          <span className="text-xs text-red-700">
                            Invalid email address
                          </span>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password*</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            className="pr-8"
                            {...register("password", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          {errors?.password?.type === "required" && (
                            <span className="text-xs text-red-700">
                              Please provide a Password
                            </span>
                          )}

                          {errors?.password?.type === "minLength" && (
                            <p className="text-xs text-red-700">
                              Password must be at least 5 characters long
                            </p>
                          )}

                          <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <IoMdEyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <IoMdEye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </LabelInputContainer>
                      <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                        type="submit"
                      >
                        {isLoading ? (
                          <SyncLoader color="#FFFFFF" size={8} />
                        ) : (
                          <div>Create &rarr;</div>
                        )}

                        <BottomGradient />
                      </button>
                      <ToastContainer />
                    </form>
                  </div>
                </BackgroundGradient>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateUser;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
