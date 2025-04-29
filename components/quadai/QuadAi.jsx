"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const QuadAi = () => {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [livingArea, setLivingArea] = useState(0);
  const [floor, setFloor] = useState(0);
  const [condition, setCondition] = useState(0);
  const [grade, setGrade] = useState(0);
  const [houseArea, setHouseArea] = useState(0);
  const [builtYear, setBuiltYear] = useState(0);
  const [nearBySchools, setNearBySchools] = useState(0);
  const [airPortDistance, setAirPortDistance] = useState(0);

  const [res, setRes] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/quadeai", {
        method: "POST",
        body: JSON.stringify({
          bedrooms,
          bathrooms,
          livingArea,
          floor,
          condition,
          grade,
          houseArea,
          builtYear,
          nearBySchools,
          airPortDistance,
        }),
      });
      const data = await response.json();
      setRes(data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <section className="flex justify-center items-center w-full min-h-screen py-14">
      <div className="flex flex-col items-center justify-center w-full lg:container px-5">
        <h2 className="text-4xl text-zinc-800 font-semibold text-center font-heading">
          QuadAI
        </h2>
        <p className="text-lg font-medium text-zinc-800 text-center mt-3">
          Predict the price of your house with our QuadAI model.
        </p>
        <form
          action=""
          className="flex flex-col items-center justify-center w-full max-w-xl mt-10 gap-3"
        >
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="bedrooms"
              className="text-lg font-medium text-zinc-800"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="bathrooms"
              className="text-lg font-medium text-zinc-800"
            >
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="livingArea"
              className="text-lg font-medium text-zinc-800"
            >
              Living Area
            </label>
            <input
              type="number"
              id="livingArea"
              value={livingArea}
              onChange={(e) => setLivingArea(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="floor"
              className="text-lg font-medium text-zinc-800"
            >
              Floor
            </label>
            <input
              type="number"
              id="floor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="condition"
              className="text-lg font-medium text-zinc-800"
            >
              Condition
            </label>
            <input
              type="number"
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="grade"
              className="text-lg font-medium text-zinc-800"
            >
              Grade
            </label>
            <input
              type="number"
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="houseArea"
              className="text-lg font-medium text-zinc-800"
            >
              House Area
            </label>
            <input
              type="number"
              id="houseArea"
              value={houseArea}
              onChange={(e) => setHouseArea(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="builtYear"
              className="text-lg font-medium text-zinc-800"
            >
              Built Year
            </label>
            <input
              type="number"
              id="builtYear"
              value={builtYear}
              onChange={(e) => setBuiltYear(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="nearBySchools"
              className="text-lg font-medium text-zinc-800"
            >
              Near By Schools
            </label>
            <input
              type="number"
              id="nearBySchools"
              value={nearBySchools}
              onChange={(e) => setNearBySchools(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label
              htmlFor="airPortDistance"
              className="text-lg font-medium text-zinc-800"
            >
              AirPort Distance
            </label>
            <input
              type="number"
              id="airPortDistance"
              value={airPortDistance}
              onChange={(e) => setAirPortDistance(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <p className="text-lg font-medium text-left self-start mt-3 text-blue-600">
            {res?.[0]}
          </p>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mt-5 cursor-pointer w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Predicting..." : "Predict Price"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuadAi;
