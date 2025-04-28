import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const PlaceCard = ({ place }) => {
  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-lg overflow-hidden relative">
      <div className="w-full h-44 overflow-hidden">
        <img
          src={place.coverImage}
          alt=""
          className="w-full h-full object-cover hover:scale-110 transition duration-300 ease-in-out"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 w-full p-5 gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-semibold font-heading text-zinc-900">
              {place.name}
            </h2>
            <p className="text-md font-normal text-blue-600 flex items-center gap-1">
              <MapPin className="inline-block" size={16} />
              {place.location}
            </p>
          </div>
          <p className="text-md font-normal text-zinc-700">
            {place.description}
          </p>
          <ul className="flex flex-wrap gap-2 w-full">
            {place.features.map((feature, index) => (
              <li
                key={index}
                className="text-sm font-normal text-zinc-700 py-1 px-2 bg-blue-100 rounded-full"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={`/properties/${place.slug}`}
          className="px-4 py-2 text-md font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer flex items-center gap-1 self-start"
        >
          View Details <ArrowRight className="inline-block" size={22} />
        </Link>
      </div>
      <p className="text-sm font-normal absolute top-1 right-1 bg-blue-600 text-white py-1 px-2 rounded-full">
      ₹ {place.price}
      </p>
    </div>
  );
};

export default PlaceCard;
