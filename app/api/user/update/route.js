import dbClient from "@/prisma/dbClient";
import { NextResponse } from "next/server";
import getDataFromToken from "@/lib/getDataFromToken";
import bcryptjs from "bcryptjs";

export async function PUT(request) {
  try {
    const { email: userEmail } = await getDataFromToken(request);

    const { name, password, profilePicture } = await request.json();

    const updatedData = {};

    if (name) {
      updatedData.name = name;
    }
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updatedData.password = hashedPassword;
    }
    if (profilePicture) {
      updatedData.profilePicture = profilePicture;
    }

    await dbClient.user.update({
      where: { email: userEmail },
      data: updatedData,
    });

    return NextResponse.json(
      { message: "User profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating user profile:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
