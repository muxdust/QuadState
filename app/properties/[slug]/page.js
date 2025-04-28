import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PlaceView from "@/components/places/PlaceView";

const PropertyPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-start items-center w-full py-14 min-h-screen bg-white">
        <PlaceView />
      </main>
      <Footer />
    </>
  );
};

export default PropertyPage;
