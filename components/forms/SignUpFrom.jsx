"use client";

import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

const imagepath = "/assets/sign-up.avif";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full h-full justify-center items-center">
        <div className="hidden lg:flex justify-center items-center w-full h-full">
          <img src={imagepath} alt="" className="h-full w-full object-cover" />
        </div>
        <form
          action=""
          className="flex flex-col justify-center items-center w-full h-full px-5 py-20 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-semibold font-heading text-rose-600 text-center">
            Sign Up to LuxeEstate
          </h2>
          <p className="text-md font-normal text-zinc-800 text-center mt-2">
            Create your account to get started
          </p>
          <div className="flex flex-col justify-start items-start w-full gap-2 mt-5">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2 mt-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2 mt-5">
            <label htmlFor="password">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2 mt-5">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-300"
                placeholder="Confirm your password"
                required
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeClosed size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          <button className="px-6 py-3 text-md font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition duration-300 cursor-pointer mt-5 w-full">
            Sign Up
          </button>
          <p className="text-md font-normal text-zinc-800 mt-5">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-rose-600 hover:text-rose-700 transition duration-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
