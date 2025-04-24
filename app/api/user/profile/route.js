import dbClient from "@/prisma/dbClient";
import { NextResponse } from "next/server";
import getDataFromToken from "@/lib/getDataFromToken";

export async function GET(request) {
  try {
    const { email: userEmail } = await getDataFromToken(request);

    const userProfile = await dbClient.user.findUnique({
      where: { email: userEmail },
      select: {
        name: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile, { status: 200 });
  } catch (error) {
    console.error("Error in fetching user profile:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
