"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Building,
  Settings,
  LogOutIcon,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Alert from "../ui/Alert";
import Link from "next/link";

const Sidebar = ({
  setActiveComponent,
  activeComponent,
  userProfile,
  userName,
  userEmail,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setIsOpen(false);
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      return response.json();
    },
    onSuccess: () => {
      setNotification({
        message: "Logout successful!",
        type: "success",
      });
      setShowAlert(true);
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      setNotification({
        message: "Logout failed. Please try again.",
        type: "error",
      });
      setShowAlert(true);
      console.error("Logout error:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 1000);
  };

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, component: "Dashboard" },
    { name: "Properties", icon: <Building />, component: "Properties" },
    { name: "Settings", icon: <Settings />, component: "Settings" },
  ];

  return (
    <nav className="flex bg-white">
      {showAlert && (
        <Alert
          notification={notification}
          toggleAlert={() => setShowAlert(false)}
        />
      )}
      <div className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-zinc-300 bg-white p-5">
        <div className="flex flex-col items-start justify-start gap-3 w-full">
          <Link href="/" className="text-2xl font-semibold font-heading text-blue-600">
            QuadState
          </Link>
          <img
            src={userProfile}
            alt=""
            className="w-14 h-14 rounded-full object-cover mt-5"
          />
          <div className="flex flex-col gap-1 justify-start items-start w-full">
            <h3 className="text-xl font-semibold text-zinc-800 font-heading">
              {userName}
            </h3>
            <p className="text-md font-normal text-zinc-700">{userEmail}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-3 mt-5">
          {sidebarItems.map((item, index) => (
            <li
              className={`px-3 py-2 flex items-center justify-start gap-3 rounded-md transition duration-300 cursor-pointer
             ${
               activeComponent === item.component
                 ? "bg-blue-600 text-white"
                 : "bg-white text-zinc-800 hover:bg-blue-600 hover:text-white"
             }`}
              key={index}
              onClick={() => handleComponentChange(item.component)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-md font-normal">{item.name}</span>
            </li>
          ))}
        </ul>
        <button
          className="mt-auto flex items-center justify-start gap-2 px-3 py-2 bg-red-600 text-white rounded-md transition duration-300 cursor-pointer hover:bg-red-700"
          onClick={handleLogout}
        >
          <LogOutIcon size={24} />
          Logout
        </button>
      </div>
      <div className="flex lg:hidden flex-col w-full bg-white px-5 py-3 fixed top-0 z-50 border-b border-zinc-300">
        <div className="flex items-center justify-between w-full">
          {/* <img
            src={userProfile}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          /> */}
          <Link href="/" className="text-2xl font-semibold font-heading text-blue-600">
            QuadState
          </Link>
          <button className="cursor-pointer" onClick={toggleSidebar}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="mt-4 w-full">
            <ul className="flex flex-col gap-4 w-full justify-center items-center">
              {sidebarItems.map((item, index) => (
                <li
                  className={`px-3 py-2 w-full flex items-center justify-start gap-3 rounded-md transition duration-300 cursor-pointer ${
                    activeComponent === item.component
                      ? "bg-blue-600 text-white"
                      : "bg-white text-zinc-800 hover:bg-blue-600 hover:text-white"
                  }`}
                  key={index}
                  onClick={() => handleComponentChange(item.component)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-md font-normal">{item.name}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 self-center w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md transition duration-300 cursor-pointer hover:bg-red-700"
              onClick={handleLogout}
            >
              <LogOutIcon size={24} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
