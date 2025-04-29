"use client";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Alert from "../ui/Alert";

const Settings = ({ userDetails }) => {
  const [name, setName] = useState(userDetails.name || "");
  const [email, setEmail] = useState(userDetails.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setprofileImage] = useState(
    userDetails.profileImage || ""
  );
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        name,
        ...(password && { password }),
        ...(profileImage && typeof profileImage === "string" && profileImage.startsWith("data:image") && { profileImage }),
      };

      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    },
    onSuccess: () => {
      setNotification({
        message: "Profile updated successfully",
        type: "success",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
    onError: (error) => {
      setNotification({
        message: error.message || "Failed to update profile",
        type: "error",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleprofileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await fileToBase64(file);
        setprofileImage(base64String);
      } catch (error) {
        setNotification({
          message: "Failed to process profile picture",
          type: "error",
        });
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-start w-full">
      {showAlert && (
        <Alert notification={notification} toggleAlert={() => setShowAlert(false)} />
      )}
      <div className="flex flex-col justify-start items-start w-full gap-2">
        <h2 className="text-2xl font-semibold text-zinc-800 font-heading">
          User Details
        </h2>
        <p className="text-lg font-normal text-zinc-800">
          Manage your account details and preferences.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start w-full gap-2 max-w-xl mt-3"
      >
        <img
          src={userDetails.profileImage || "/default-profile.png"}
          alt="Profile Picture"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label
            htmlFor="file"
            className="text-lg font-medium font-heading text-zinc-800"
          >
            Profile Picture
          </label>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <input
              type="file"
              id="file"
              accept="image/jpeg,image/png"
              onChange={handleprofileImageChange}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label
            htmlFor="name"
            className="text-lg font-medium font-heading text-zinc-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label
            htmlFor="email"
            className="text-lg font-medium font-heading text-zinc-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full px-4 py-2 border border-zinc-300 rounded-md bg-zinc-100 text-zinc-500 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label
            htmlFor="password"
            className="text-lg font-medium font-heading text-zinc-800"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your password"
            />
            <button
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mt-5 cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Settings;