import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
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
    } = await req.json();

    const client = await Client.connect("RagedKrish/house_price");

    const result = await client.predict("/predict", {
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      living_area: Number(livingArea),
      floors: Number(floor),
      condition: Number(condition),
      grade: Number(grade),
      house_area: Number(houseArea),
      built_year: Number(builtYear),
      nearby_schools: Number(nearBySchools),
      airport_distance: Number(airPortDistance),
    });

    console.log(result.data);
    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json({ error: "Failed to predict house price." });
  }
}
