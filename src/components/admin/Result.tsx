"use client";

import { getALLOption } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const Result = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["getALLOption"],
    queryFn: getALLOption,
  });

  if (isError) {
    return (
      <div className="text-center text-xl font-bold">
        Something went wrong, Please reload
      </div>
    );
  }

  interface Item {
    option: string;
  }

  // Initialize counts
  const counts: Record<string, number> = { rice: 0, polao: 0, khichuri: 0 };

  // Count occurrences
  data?.forEach((item: any) => {
    if (item.option === "rice") {
      counts["rice"]++;
    } else if (item.option === "polao") {
      counts["polao"]++;
    } else if (item.option === "khichuri") {
      counts["khichuri"]++;
    }
  });

  return (
    <div className="container p-4 mt-20 max-md:mt-28">
      <p className="text-sky-900 text-lg font-semibold my-4">
        What option do you want for Sunday Lunch?
      </p>
      <ul className="text-xl">
        <li className="text-gray-700 mb-2">
          Rice and beef:{" "}
          <span className="text-sky-800 font-bold text-xl">{counts?.rice}</span>
        </li>
        <li className="text-gray-700 mb-2">
          Polao and beef:{" "}
          <span className="text-sky-800 font-bold text-xl">
            {counts?.polao}
          </span>
        </li>
        <li className="text-gray-700 mb-2">
          Khichuri and beef:{" "}
          <span className="text-sky-800 font-bold text-xl">
            {counts?.khichuri}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Result;
