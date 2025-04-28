"use client";
import React, { useState, useEffect } from "react";
import PlaceCard from "../ui/PlaceCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const Featured = () => {
  const [places, setPlaces] = useState([]);
  const [err, setErr] = useState("");

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
    if (data) {
      setPlaces(data.slice(0, 4));
    }

    if (error) {
      setErr("Error loading properties.");
    }

    if (isLoading) {
      setErr("Loading...");
    }
  }, [data, error, isLoading]);

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

        {places.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-stretch w-full gap-5">
            {places.map((place, index) => (
              <PlaceCard key={index} place={place} />
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10">{err}</p>
        )}

        <Link
          href="/properties"
          className="mt-10 px-6 py-3 text-md font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer flex items-center gap-1"
        >
          View All Listings
          <ArrowRight className="inline-block" size={22} />
        </Link>
      </div>
    </section>
  );
};

export default Featured;
