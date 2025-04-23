import React from "react";
import { Bot } from "lucide-react";

const Banner = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center w-full lg:container mx-5 bg-gradient-to-br from-rose-500 to-rose-600 text-white py-14 px-5 rounded-lg shadow-lg gap-3">
        <h2 className="text-2xl font-semibold text-center font-heading">
          Wants to predict your property value?
        </h2>
        <p className="text-md font-normal text-white text-center max-w-2xl">
          Luxe Ai is here to help you with that. Our advanced AI technology
          provides accurate property valuations and insights to help you make
          informed decisions.
        </p>
        <button className="px-6 py-3 text-md font-medium text-rose-600 bg-white rounded-md hover:bg-zinc-200 transition duration-300 cursor-pointer flex items-center gap-1">
          Try Luxe Ai
          <Bot className="inline-block" size={20} />
        </button>
      </div>
    </section>
  );
};

export default Banner;
