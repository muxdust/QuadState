"use client";
import React, { useState, useEffect } from "react";
import PlaceCard from "../ui/PlaceCard";
import { useQuery } from "@tanstack/react-query";

const Properties = () => {
  const [places, setPlaces] = useState([]);
  const [err, setErr] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const fetchPlaces = async () => {
    const response = await fetch("/api/fetch/getall");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["places"],
    queryFn: fetchPlaces,
  });

  useEffect(() => {
    if (data) setPlaces(data);
    if (error) setErr("Error loading properties.");
    if (isLoading) setErr("Loading...");
  }, [data, error, isLoading]);

  const getFilteredPlaces = () => {
    return places.filter((place) => {
      const matchesName =
        name.trim() === "" ||
        place.name.toLowerCase().includes(name.toLowerCase());

      const matchesLocation =
        location.trim() === "" ||
        place.location.toLowerCase().includes(location.toLowerCase());

      let matchesPrice = true;
      if (price.trim()) {
        const match = price.match(/(\d+)\s*-\s*(\d+)/);
        if (match) {
          const min = parseInt(match[1], 10);
          const max = parseInt(match[2], 10);
          const placePrice = parseInt(
            String(place.price).replace(/[^\d]/g, ""),
            10
          );
          matchesPrice =
            !isNaN(placePrice) && placePrice >= min && placePrice <= max;
        }
      }

      return matchesName && matchesLocation && matchesPrice;
    });
  };

  const filteredPlaces = getFilteredPlaces();

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-14">
      <div className="flex flex-col items-center justify-center w-full lg:container px-5">
        <h2 className="text-4xl text-zinc-800 font-semibold text-center font-heading">
          Explore Listings
        </h2>
        <p className="text-md font-normal text-zinc-700 text-center mt-3">
          Discover our handpicked selection of exceptional properties that
          exemplify luxury living at its finest.
        </p>

        <div className="flex flex-col justify-start items-start w-full mt-7 p-5 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl text-zinc-800 font-semibold font-heading">
            Filter by:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full mt-3 gap-5">
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <h2 className="text-lg text-zinc-800 font-medium font-heading">
                Name
              </h2>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <h2 className="text-lg text-zinc-800 font-medium font-heading">
                Price
              </h2>
              <input
                type="text"
                placeholder="₹ 1000000 - ₹ 100000000"
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <h2 className="text-lg text-zinc-800 font-medium font-heading">
                Location
              </h2>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
        {filteredPlaces.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-stretch w-full gap-5">
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={index} place={place} />
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10">
            {err || "No results found."}
          </p>
        )}
      </div>
    </section>
  );
};

export default Properties;
