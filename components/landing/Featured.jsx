import React from "react";
import PlaceCard from "../ui/PlaceCard";
import { ArrowRight } from "lucide-react";

const places = [
  {
    name: "Luxury Villa",
    description: "A beautiful villa with a stunning view.",
    coverImage:
      "https://images.unsplash.com/photo-1598635031829-4bfae29d33eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZpbGxhfGVufDB8fDB8fHww",
    features: ["Pool", "Garden", "Garage"],
    price: "$1,200,000",
    location: "Beverly Hills, CA",
  },
  {
    name: "Modern Apartment",
    description: "A stylish apartment in the city center.",
    coverImage:
      "https://images.unsplash.com/photo-1743972939938-0226de487d67?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: ["Gym", "Balcony", "Parking"],
    price: "$800,000",
    location: "New York, NY",
  },
  {
    name: "Beachfront Condo",
    description: "Spectacular oceanview condo with direct beach access.",
    coverImage:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format&fit=crop",
    features: ["Ocean View", "Private Beach", "Security"],
    price: "$950,000",
    location: "Miami, FL",
  },
  {
    name: "Mountain Retreat",
    description: "Cozy cabin with breathtaking mountain views.",
    coverImage:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=500&auto=format&fit=crop",
    features: ["Fireplace", "Hot Tub", "Hiking Trails"],
    price: "$650,000",
    location: "Aspen, CO",
  },
];

const Featured = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center w-full lg:container px-5">
        <h2 className="text-3xl font-semibold text-center font-heading">
          Featured Listings
        </h2>
        <p className="text-md font-normal text-zinc-700 text-center mt-3">
          Discover our handpicked selection of exceptional properties that
          exemplify luxury living at its finest.
        </p>
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-stretch w-full gap-5">
          {places.map((place, index) => (
            <PlaceCard key={index} place={place} />
          ))}
        </div>
        <button className="mt-10 px-6 py-3 text-md font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition duration-300 cursor-pointer flex items-center gap-1">
          View All Listings
          <ArrowRight className="inline-block" size={22} />
        </button>
      </div>
    </section>
  );
};

export default Featured;
