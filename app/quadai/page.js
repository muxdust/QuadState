import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import QuadAi from "@/components/quadai/QuadAi";

const QuadAiPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-start items-center w-full py-14 min-h-screen bg-white">
        <QuadAi />
      </main>
      <Footer />
    </>
  );
};

export default QuadAiPage;
