"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TypewriterEffectSmoothCom } from "./TypewriterEffectSmoothCom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const FormSchema = z.object({
  type: z.enum(["rice", "polao", "khichuri"], {
    required_error: "You need to select a notification type.",
  }),
});

export function OptionPart() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const data1 = {
      option: data?.type,
    };
    fetch(`/api/option`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === true) {
          toast.success("Opinion sent successfully!", {
            position: "top-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            router.push("/");
          }, 3000);

          // router.push("/");
        } else {
          toast.error("Opinion not sent. Please try again!", {
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
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container text-lg">
        <TypewriterEffectSmoothCom />
        <Link
          href="/"
          className="flex gap-2 my-4 items-center  text-xl font-bold text-sky-800 "
        >
          <IoMdArrowBack /> back
        </Link>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sky-900 text-lg font-semibold">
                    What option do you want for sunday Lunch ?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="rice" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Rice and beef
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="polao" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Polao and beef
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="khichuri" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Khichuri and beef
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-fit px-6 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-4"
              type="submit"
            >
              {isLoading ? (
                <SyncLoader color="#FFFFFF" size={8} />
              ) : (
                <div>Submit &rarr;</div>
              )}

              <BottomGradient />
            </button>
            <ToastContainer />
          </form>
        </Form>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";

// const OptionPart = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event: any) => {
//     setSelectedOption(event.target.value);
//   };
//   return (
//     <div className="flex justify-center">
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 container">
//         <div className="bg-white p-8 rounded shadow-md">
//           <h1 className="text-2xl font-semibold mb-4">Select an option:</h1>
//           <div className="flex items-center mb-4">
//             <input
//               type="radio"
//               id="option1"
//               name="options"
//               value="option1"
//               checked={selectedOption === "option1"}
//               onChange={handleOptionChange}
//               className="mr-2"
//             />
//             <label htmlFor="option1">Option 1</label>
//           </div>
//           <div className="flex items-center mb-4">
//             <input
//               type="radio"
//               id="option2"
//               name="options"
//               value="option2"
//               checked={selectedOption === "option2"}
//               onChange={handleOptionChange}
//               className="mr-2"
//             />
//             <label htmlFor="option2">Option 2</label>
//           </div>
//           <div className="flex items-center mb-4">
//             <input
//               type="radio"
//               id="option3"
//               name="options"
//               value="option3"
//               checked={selectedOption === "option3"}
//               onChange={handleOptionChange}
//               className="mr-2"
//             />
//             <label htmlFor="option3">Option 3</label>
//           </div>
//           <p>Selected Option: {selectedOption}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OptionPart;
