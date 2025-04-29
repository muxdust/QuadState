import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LuxeAi from "@/components/luxeai/LuxeAi";

const LuxeAiPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-start items-center w-full py-14 min-h-screen bg-white">
        <LuxeAi />
      </main>
      <Footer />
    </>
  );
};

export default LuxeAiPage;
