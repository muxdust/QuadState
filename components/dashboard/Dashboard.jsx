"use client";
import React from "react";
import { Building, ThumbsUp, ChartNoAxesColumn } from "lucide-react";

const Dashboard = ({
  userDetails,
  totalProperties,
  totalViews,
  totalLikes,
  setActiveComponent,
}) => {
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-col justify-start items-start w-full rounded-lg p-5 bg-gradient-to-br from-blue-500 to-blue-600">
        <h2 className="text-2xl font-semibold text-white font-heading">
          Welcome back, {userDetails.name}!
        </h2>
        <p className="text-md text-white font-normal mt-2">
          Here are your account overview
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-full">
        <div className="flex flex-col justify-start items-start bg-white rounded-lg p-5 shadow-md">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-medium text-zinc-800 font-heading">
              Total Properties
            </h3>
            <Building size={24} className="text-blue-600" />
          </div>
          <p className="text-2xl font-semibold font-heading text-zinc-700">
            {totalProperties}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start bg-white rounded-lg p-5 shadow-md">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-medium text-zinc-800 font-heading">
              Total Views
            </h3>
            <ChartNoAxesColumn size={24} className="text-blue-600" />
          </div>
          <p className="text-2xl font-semibold font-heading text-zinc-700">
            {totalViews}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start bg-white rounded-lg p-5 shadow-md">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-medium text-zinc-800 font-heading">
              Total Likes
            </h3>
            <ThumbsUp size={24} className="text-blue-600" />
          </div>
          <p className="text-2xl font-semibold font-heading text-zinc-700">
            {totalLikes}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-full mt-5">
        <h3 className="text-2xl font-semibold text-zinc-800 font-heading">
          Your Profile
        </h3>
        <p className="text-md text-zinc-700 font-normal">
          Here are your profile details
        </p>
        <div className="flex flex-col justify-start items-start w-full max-w-md rounded-lg p-5 bg-white shadow-md mt-5">
          <img
            src={userDetails.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="flex flex-col justify-start items-start w-full">
            <h4 className="text-lg font-medium text-zinc-800 font-heading">
              Name
            </h4>
            <p className="text-md text-zinc-700 font-normal">
              {userDetails.name}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full">
            <h4 className="text-lg font-medium text-zinc-800 font-heading">
              Email
            </h4>
            <p className="text-md text-zinc-700 font-normal">
              {userDetails.email}
            </p>
          </div>
          <button
            className="mt-5 px-3 py-2 bg-blue-600 text-white rounded-md transition duration-300 cursor-pointer hover:bg-blue-700"
            onClick={() => setActiveComponent("Settings")}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="mt-30 w-full flex justify-center items-center">
        <h2 className="text-4xl font-semibold text-zinc-400 font-heading text-center">
          MORE FEATURES COMING SOON!
        </h2>
      </div>
    </div>
  );
};

export default Dashboard;
