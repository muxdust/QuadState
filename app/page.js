import Banner from "@/components/landing/Banner";
import Featured from "@/components/landing/Featured";
import Hero from "@/components/landing/Hero";
import OurServices from "@/components/landing/OurServices";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-start items-center w-full gap-14 pb-14 min-h-screen bg-white">
        <Hero />
        <Featured />
        <OurServices />
        <Banner />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
