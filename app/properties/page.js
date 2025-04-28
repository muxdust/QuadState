import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Properties from "@/components/places/Properties";

const PropertiesPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-start items-center w-full py-14 min-h-screen bg-white">
        <Properties />
      </main>
      <Footer />
    </>
  );
};

export default PropertiesPage;
