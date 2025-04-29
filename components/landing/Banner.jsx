import React from "react";
import { Bot } from "lucide-react";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center w-full lg:container mx-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white py-14 px-5 rounded-lg shadow-lg gap-3">
        <h2 className="text-2xl font-semibold text-center font-heading">
          Wants to predict your property value?
        </h2>
        <p className="text-md font-normal text-white text-center max-w-2xl">
          LuxeAi is here to help you with that. Our advanced AI technology
          provides accurate property valuations and insights to help you make
          informed decisions.
        </p>
        <Link
          href="/luxeai"
          className="px-6 py-3 text-md font-medium text-blue-600 bg-white rounded-md hover:bg-zinc-200 transition duration-300 cursor-pointer flex items-center gap-1"
        >
          Try LuxeAi
          <Bot className="inline-block" size={20} />
        </Link>
      </div>
    </section>
  );
};

export default Banner;
