"use client";
import React from "react";
import { Warehouse, ThumbsUp, ChartNoAxesColumn } from "lucide-react";

const Dashboard = ({
  userDetails,
  totalProperties,
  totalViews,
  totalLikes,
}) => {
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-col justify-start items-start w-full max-w-4xl rounded-lg p-5 bg-gradient-to-br from-rose-500 to-rose-600">
        <h2 className="text-2xl font-semibold text-white font-heading">
          Welcome back, {userDetails.name}!
        </h2>
        <p className="text-md text-white font-normal mt-2">
          Here are your account overview
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-full max-w-4xl">
        <div className="flex flex-col justify-start items-start bg-white rounded-lg p-5 shadow-md">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-medium text-zinc-800 font-heading">
              Total Properties
            </h3>
            <Warehouse size={24} className="text-rose-600" />
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
            <ChartNoAxesColumn size={24} className="text-rose-600" />
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
            <ThumbsUp size={24} className="text-rose-600" />
          </div>
          <p className="text-2xl font-semibold font-heading text-zinc-700">
            {totalLikes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
