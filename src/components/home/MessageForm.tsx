"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textArea";
import { BackgroundGradient } from "../ui/background-gradient";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";
import Link from "next/link";

interface IFormInput {
  subject: string;
  message: string;
}

export function MessageForm() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);
    fetch(`/api/post`, {
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
          toast.success("Message sent successfully!", {
            position: "top-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
        } else {
          toast.error("Message not sent. Please try again!", {
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
    <BackgroundGradient className="rounded-[22px]  sm:p-10 bg-white dark:bg-zinc-900 w-full">
      <div className=" mx-auto rounded-3xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 uppercase">
          Share your concerns anonymously
        </h2>

        <form className="my-8 " onSubmit={handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="subject">Subject*</Label>
            <Input
              id="subject"
              placeholder="Enter subject"
              type="text"
              {...register("subject", {
                required: true,
                minLength: 5,
                pattern: /[A-Za-z]/,
              })}
            />
            {errors?.subject?.type === "required" && (
              <span className="text-xs text-red-700">
                Please provide a subject
              </span>
            )}

            {errors?.subject?.type === "minLength" && (
              <p className="text-xs text-red-700">
                Subject must be at least 5 characters long
              </p>
            )}
            {errors?.subject?.type === "pattern" && (
              <p className="text-xs text-red-700">
                Subject must contain at least one letter
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="subject">Message*</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              {...register("message", {
                required: true,
                minLength: 10,
                pattern: /[A-Za-z]/,
              })}
            />
            {errors?.message?.type === "required" && (
              <span className="text-xs text-red-700">
                Please provide a message
              </span>
            )}
            {errors?.message?.type === "minLength" && (
              <p className="text-xs text-red-700">
                Message must be at least 10 characters long
              </p>
            )}
            {errors?.message?.type === "pattern" && (
              <p className="text-xs text-red-700">
                Message must contain at least one letter
              </p>
            )}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-4"
            type="submit"
          >
            {isLoading ? (
              <SyncLoader color="#FFFFFF" size={8} />
            ) : (
              <div>Send &rarr;</div>
            )}

            <BottomGradient />
          </button>

          {/* 2nd part */}

          <Link
            className="relative inline cursor-pointer text-xl font-semibold  before:bg-green-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 text-cyan-600"
            href="/opinion"
          >
            Opinion
          </Link>

          <ToastContainer />
        </form>
      </div>
    </BackgroundGradient>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
