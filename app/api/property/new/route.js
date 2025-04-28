import getDataFromToken from "@/lib/getDataFromToken";
import { NextResponse } from "next/server";
import dbClient from "@/prisma/dbClient";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const { id } = await getDataFromToken(request);

    const {
      name,
      description,
      features,
      rules,
      price,
      coverImage,
      otherImages,
      location,
      address,
      propertyArea,
      totalFloors,
      furnished,
      builtYear,
      parkingAvailable,
      ownerName,
      ownerEmail,
      ownerPhone,
    } = await request.json();

    if (
      !name ||
      !description ||
      !features ||
      !rules ||
      !price ||
      !coverImage ||
      !otherImages ||
      !location ||
      !address ||
      !propertyArea ||
      !totalFloors ||
      !furnished ||
      !builtYear ||
      !parkingAvailable ||
      !ownerName ||
      !ownerEmail ||
      !ownerPhone
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/ /g, "-").replace(/'/g, "");

    const featureArray = features.split(",").map((feature) => feature.trim());
    const ruleArray = rules.split(",").map((rule) => rule.trim());

    const uploadedCoverImage = await uploadImage(coverImage, "luxestate");

    const uploadedOtherImages = await Promise.all(
      otherImages.map((img) => uploadImage(img, "luxestate"))
    );

    await dbClient.property.create({
      data: {
        name,
        slug,
        description,
        features: featureArray,
        rules: ruleArray,
        price,
        coverImage: uploadedCoverImage.url,
        otherImages: uploadedOtherImages.map((img) => img.url),
        location,
        address,
        propertyArea,
        totalFloors,
        furnished,
        builtYear,
        parkingAvailable,
        ownerName,
        ownerEmail,
        ownerPhone,
        userId: id,
      },
    });

    return NextResponse.json(
      { message: "Property created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating property", error);
    return NextResponse.json(
      { message: "Error creating property" },
      { status: 500 }
    );
  }
}
