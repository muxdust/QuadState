"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Home, Star, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const PlaceView = () => {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);

  console.log(slug);

  const fetchPlace = async () => {
    const response = await fetch(`/api/fetch/get/${slug}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["place", slug],
    queryFn: fetchPlace,
  });

  useEffect(() => {
    if (data) {
      setPlace(data);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-start w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:container px-5">
        <div className="w-full grid grid-cols-2 items-stretch justify-start gap-5">
          <img
            src={place.coverImage}
            alt="Cover Image"
            className="w-full h-auto rounded-lg object-cover col-span-2"
          />
          <div className="grid grid-cols-2 gap-5 col-span-2 justify-center items-stretch w-full">
            {place.otherImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-3xl font-semibold font-heading text-blue-600">
            {place.name}
          </h2>

          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-semibold text-zinc-700 flex items-center gap-2">
              <Home size={20} /> Property Details
            </h3>
            <p className="text-md text-zinc-700">{place.description}</p>
            <p className="text-md text-zinc-700">Location: {place.location}</p>
            <p className="text-md text-zinc-700">Price: {place.price}</p>
            <p className="text-md text-zinc-700">Area: {place.propertyArea}</p>
            <p className="text-md text-zinc-700">
              Built Year: {place.builtYear}
            </p>
            <p className="text-md text-zinc-700">
              Parking: {place.parkingAvailable ? "Available" : "Not Available"}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-semibold text-zinc-700 flex items-center gap-2">
              <Star size={20} /> Features
            </h3>
            <ul className="list-disc list-inside flex flex-col gap-1">
              {place.features.map((feature, index) => (
                <li key={index} className="text-md text-zinc-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-semibold text-zinc-700 flex items-center gap-2">
              <User size={20} /> Owner Information
            </h3>
            <p className="text-md text-zinc-700">Name: {place.ownerName}</p>
            <p className="text-md text-zinc-700">Phone: {place.ownerPhone}</p>
            <p className="text-md text-zinc-700">Email: {place.ownerEmail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceView;
