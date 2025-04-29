"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Properties from "./Properties";
import { useQuery } from "@tanstack/react-query";

const fetchUserDetails = async () => {
  const response = await fetch("/api/user/profile");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const DashPage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
  });

  if (isLoading || !userDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const properties = userDetails.properties || [];
  const totalProperties = properties.length;
  const totalViews = properties.reduce((acc, p) => acc + p.views, 0);
  const totalLikes = properties.reduce((acc, p) => acc + p.likes, 0);

  console.log(userDetails.profileImage);

  return (
    <main>
      <div className="flex w-full h-screen">
        <Sidebar
          userProfile={userDetails.profileImage || "/assets/default.webp"}
          userName={userDetails.name}
          userEmail={userDetails.email}
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
        />
        <div className="flex-1 px-5 py-22 lg:py-12 w-full">
          {activeComponent === "Dashboard" && (
            <Dashboard
              userDetails={userDetails}
              totalProperties={totalProperties}
              totalViews={totalViews}
              totalLikes={totalLikes}
              setActiveComponent={setActiveComponent}
            />
          )}
          {activeComponent === "Settings" && (
            <Settings userDetails={userDetails} />
          )}
          {activeComponent === "Properties" && (
            <Properties userProperties={properties} />
          )}
        </div>
      </div>
    </main>
  );
};

export default DashPage;
