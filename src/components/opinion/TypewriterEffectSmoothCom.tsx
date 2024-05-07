"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothCom() {
  const words = [
    {
      text: "Give",
    },
    {
      text: "your",
    },
    {
      text: "valuable",
    },
    {
      text: "Opinion.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
