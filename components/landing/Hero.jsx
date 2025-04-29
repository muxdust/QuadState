import React from "react";
const imagepath = "/assets/hero.webp";
import { Compass } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="flex justify-center items-center w-full py-26 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${imagepath})` }}
    >
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>

      <div className="relative flex flex-col justify-center items-center lg:items-start gap-6 text-center lg:text-left p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl lg:text-6xl font-bold font-heading leading-tight text-white">
          <span>Find Your</span>
          <span className="ml-2">Dream Luxury Living</span>
        </h2>
        <p className="text-md lg:text-lg font-normal text-white">
          Discover the finest luxury properties with our expert guidance. Your
          dream home awaits.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/properties"
            className="px-6 py-3 text-md font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer flex items-center gap-2"
          >
            Browse Properties
            <Compass className="inline-block" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
