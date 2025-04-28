import dbClient from "@/prisma/dbClient";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const property = await dbClient.property.findFirst({
      where: { slug: slug },
      select: {
        name: true,
        slug: true,
        description: true,
        features: true,
        rules: true,
        price: true,
        coverImage: true,
        otherImages: true,
        location: true,
        propertyArea: true,
        totalFloors: true,
        furnished: true,
        builtYear: true,
        parkingAvailable: true,
        ownerName: true,
        ownerEmail: true,
        ownerPhone: true,
        views: true,
        likes: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Error in fetching slug:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
