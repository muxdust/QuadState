import dbClient from "@/prisma/dbClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProperties = await dbClient.property.findMany({
      select: {
        name: true,
        slug: true,
        description: true,
        features: true,
        price: true,
        coverImage: true,
        location: true,
      },
    });

    if (!allProperties) {
      return NextResponse.json(
        { error: "No properties found" },
        { status: 404 }
      );
    }

    return NextResponse.json(allProperties, { status: 200 });
  } catch (error) {
    console.error("Error in fetching property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}