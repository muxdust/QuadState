"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "LuxeAi", path: "/luxeai" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-center items-center w-full border-b border-zinc-300 fixed top-0 z-50 bg-white">
      <div className="flex flex-col justify-center items-center w-full px-5 lg:container py-3">
        <div className="flex justify-between items-center w-full">
          <Link
            href="/"
            className="text-2xl font-semibold font-heading text-rose-600"
          >
            LuxeEstate
          </Link>
          <ul className="gap-5 hidden lg:flex items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="text-md font-normal text-zinc-800 hover:text-rose-600 transition duration-300 cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href={"/auth/sign-in"}
              className="px-4 py-2 text-sm font-medium text-rose-500 bg-white rounded-md hover:bg-rose-600 hover:text-white border border-rose-600 transition duration-300 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href={"/auth/sign-up"}
              className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition duration-300 cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
          <button
            className="lg:hidden cursor-pointer text-zinc-800"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
        {isOpen && (
          <div className="flex flex-col items-center mt-5 lg:hidden w-full">
            <ul className="flex flex-col justify-center items-center gap-5">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-md font-normal text-zinc-800 hover:text-rose-600 transition duration-300 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-5 mt-5 w-full md:w-auto">
              <Link
                href={"/auth/sign-in"}
                className="px-4 py-2 text-sm font-medium text-rose-500 bg-white rounded-md hover:bg-rose-600 hover:text-white border border-rose-600 transition duration-300 cursor-pointer w-full text-center"
              >
                Sign In
              </Link>
              <Link
                href={"/auth/sign-up"}
                className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition duration-300 cursor-pointer w-full text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
