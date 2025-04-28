import React from "react";
import { Home, CircleDollarSign, TrendingUp } from "lucide-react";

const services = [
  {
    name: "Buying Properties",
    desc: "Navigate the buying process with expert guidance from our seasoned real estate professionals.",
    icon: <Home size={40} />,
  },
  {
    name: "Selling Properties",
    desc: "Maximize your property's value with our strategic marketing and negotiation expertise.",
    icon: <CircleDollarSign size={40} />,
  },
  {
    name: "Investment Advisory",
    desc: "Grow your wealth through strategic real estate investments tailored to your financial goals.",
    icon: <TrendingUp size={40} />,
  },
];

const OurServices = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center w-full lg:container px-5">
        <h2 className="text-3xl font-semibold text-center font-heading">
          Our Services
        </h2>
        <p className="text-md font-normal text-zinc-700 text-center mt-3">
          We provide comprehensive real estate services to help you find,
          purchase, or sell your dream property.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full gap-5 mt-7">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start w-full bg-white shadow-lg rounded-lg p-5 gap-3"
            >
              <span className="p-2 bg-blue-100 rounded-full text-blue-600">
                {service.icon}
              </span>
              <h3 className="text-xl font-semibold font-heading text-zinc-900">
                {service.name}
              </h3>
              <p className="text-md font-normal text-zinc-700">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
