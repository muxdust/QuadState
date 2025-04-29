import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full py-10 border-t border-zinc-300 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full px-5 lg:container justify-center items-stretch">
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <h2 className="text-2xl font-semibold font-heading text-blue-600">
            QuadState
          </h2>
          <p className="text-md lg:text-lg font-normal text-zinc-700">
            Discover the finest luxury properties with our expert guidance. Your
            dream home awaits.
          </p>
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <h2 className="text-lg font-semibold font-heading text-blue-600">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/properties"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <h2 className="text-lg font-semibold font-heading text-blue-600">
            Follow Us
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="#"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-md font-normal text-zinc-700 hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Instagram
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <h2 className="text-lg font-semibold font-heading text-blue-600">
            Contact Us
          </h2>
          <p className="text-md font-normal text-zinc-700">
            123 Quad St, Beverly Hills, CA 90210
          </p>
          <p className="text-md font-normal text-zinc-700">+1 (234) 567-890</p>
          <p className="text-md font-normal text-zinc-700">
            QuadState@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
