import { MessageCard } from "@/components/admin/MessageCard";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 " />
      <MessageCard />
    </div>
    // <div className="bg-white min-h-screen">
    //   <MessageCard />
    // </div>
  );
};

export default page;
