"use client";

import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Alert from "../ui/Alert";

const imagepath = "/assets/sign-in.webp";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      return res.json();
    },
    onSuccess: () => {
      setNotification({
        message: "Sign in successful!",
        type: "success",
      });
      setShowAlert(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    },
    onError: (error) => {
      setNotification({
        message: error.message || "Login failed. Please try again.",
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
            alt="Sign In"
            className="h-full w-full object-cover"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full h-full px-5 py-20 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-semibold font-heading text-rose-600 text-center">
            Sign In to LuxEstate
          </h2>
          <p className="text-md font-normal text-zinc-700 text-center mt-2">
            Please enter your credentials to access your account
          </p>

          <div className="flex flex-col justify-start items-start w-full gap-2 mt-5">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
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
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 text-md font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition duration-300 cursor-pointer mt-5 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-md font-normal text-zinc-700 mt-5">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-rose-600 hover:text-rose-700 transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
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

export default SignInForm;
