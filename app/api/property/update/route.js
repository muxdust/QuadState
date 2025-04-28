import getDataFromToken from "@/lib/getDataFromToken";
import { NextResponse } from "next/server";
import dbClient from "@/prisma/dbClient";
import { uploadImage } from "@/lib/cloudinary";

export async function PATCH(request) {
  try {
    const { id } = await getDataFromToken(request);

    const {
      propertyId,
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

    if (!propertyId) {
      return NextResponse.json(
        { message: "Property ID is required" },
        { status: 400 }
      );
    }

    const updatedData = {};

    if (name) {
      updatedData.name = name;
      updatedData.slug = name.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
    }
    if (description) updatedData.description = description;
    if (features) updatedData.features = features.split(",").map((feature) => feature.trim());
    if (rules) updatedData.rules = rules.split(",").map((rule) => rule.trim());
    if (price) updatedData.price = price;
    if (location) updatedData.location = location;
    if (address) updatedData.address = address;
    if (propertyArea) updatedData.propertyArea = propertyArea;
    if (totalFloors) updatedData.totalFloors = totalFloors;
    if (furnished) updatedData.furnished = furnished;
    if (builtYear) updatedData.builtYear = builtYear;
    if (parkingAvailable) updatedData.parkingAvailable = parkingAvailable;
    if (ownerName) updatedData.ownerName = ownerName;
    if (ownerEmail) updatedData.ownerEmail = ownerEmail;
    if (ownerPhone) updatedData.ownerPhone = ownerPhone;

    if (coverImage) {
      const uploadedCoverImage = await uploadImage(coverImage, "properties");
      updatedData.coverImage = uploadedCoverImage;
    }

    if (otherImages && otherImages.length > 0) {
      const uploadedOtherImages = await Promise.all(
        otherImages.map((img) => uploadImage(img, "properties"))
      );
      updatedData.otherImages = uploadedOtherImages;
    }

    if (Object.keys(updatedData).length === 0) {
      return NextResponse.json(
        { message: "No data provided to update" },
        { status: 400 }
      );
    }

    await dbClient.property.update({
      where: {
        id: propertyId,
        userId: id,
      },
      data: updatedData,
    });

    return NextResponse.json(
      { message: "Property updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating property", error);
    return NextResponse.json(
      { message: "Error updating property" },
      { status: 500 }
    );
  }
}
