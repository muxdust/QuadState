"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import Alert from "../ui/Alert";

const imagepath = "/assets/sign-up.avif";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showAlert, setShowAlert] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData?.message || "Sign up failed. Please try again."
        );
      }
      return res.json();
    },
    onSuccess: (data) => {
      setNotification({
        message: "Sign up successful!",
        type: "success",
      });
      setShowAlert(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      setNotification({
        message: error.message || "An error occurred. Please try again.",
        type: "error",
      });
      setShowAlert(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full h-full justify-center items-center">
        <div className="hidden lg:flex justify-center items-center w-full h-full">
          <img
            src={imagepath}
            alt="Sign Up"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full px-5 py-20 max-w-2xl mx-auto relative">
          <form onSubmit={handleSubmit} className="w-full">
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
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword((prev) => !prev);
                  }}
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
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 text-md font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition duration-300 cursor-pointer mt-5 w-full disabled:bg-rose-300 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="text-md font-normal text-zinc-800 mt-5 text-center">
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
      </div>
      {showAlert && (
        <Alert
          notification={notification}
          toggleAlert={() => setShowAlert(false)}
        />
      )}
    </section>
  );
};

export default SignUpForm;
