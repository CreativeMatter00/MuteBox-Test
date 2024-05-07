"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import moment from "moment";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    _id: string;
    subject: string;
    message: string;
    createdAt: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [messageDetails, setMessageDetails] = useState<any>();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleCardClick = (item: any) => {
    setMessageDetails(item);
    setShowDetails(true);
    console.log(item);
  };

  return (
    <div>
      {/* {showDetails ? ( */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 max-md:mt-10",
          className
        )}
      >
        {items?.map((item, idx) => (
          <div
            // href={item?.link}
            key={item?._id}
            className="relative group  block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(item)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-400 block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <Card>
              <CardTitle className="">
                {moment(item?.createdAt).format(" MMM Do YY, h:mm a")}
              </CardTitle>
              <CardDescription>{item?.subject}</CardDescription>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <p className="text-base sm:text-xl text-black mt-2 mb-2 break-words">
                {messageDetails?.subject}
              </p>
              <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mb-4 text-xs font-bold hover:cursor-default">
                <span>
                  {moment(messageDetails?.createdAt).format(" MMMM Do YYYY,")}{" "}
                </span>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  {moment(messageDetails?.createdAt).format("h:mm a")}
                </span>
              </button>
            </DialogTitle>
            <DialogDescription>
              <p className="text-lg text-neutral-900 mt-4 break-words">
                {messageDetails?.message}
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* ) : (
        <div className="mt-16">
          <div className="container">
            <button
              onClick={handleCardClickBack}
              className="flex gap-2 justify-center items-center  text-xl font-bold text-sky-800"
            >
              <IoMdArrowBack /> back
            </button>
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 break-words">
              {messageDetails?.subject}
            </p>

            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>
                {moment(messageDetails?.createdAt).format(" MMMM Do YYYY,")}{" "}
              </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                {moment(messageDetails?.createdAt).format("h:mm a")}
              </span>
            </button>

            <p className="text-lg text-neutral-900 dark:text-neutral-400 mt-4 break-words">
              {messageDetails?.message}
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4 break-words">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn("text-zinc-200 tracking-wide mt-4 break-words", className)}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  // children: React.ReactNode;
  children: string; // Ensure children is of type string
}) => {
  const truncatedText = children.slice(0, 60);
  const displayText =
    children.length > 30 ? truncatedText + "..." : truncatedText;

  return (
    <p
      className={cn(
        "mt-8 text-zinc-50 tracking-wide leading-relaxed text-lg font-bold break-words",
        className
      )}
    >
      {displayText}
    </p>
  );
};

// export function DialogDemo(props: any) {
// 	return (

// 	);
// }
