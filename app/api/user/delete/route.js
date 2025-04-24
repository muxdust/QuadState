import dbClient from "@/prisma/dbClient";
import { NextResponse } from "next/server";
import getDataFromToken from "@/lib/getDataFromToken";

export async function DELETE(request) {
  try {
    const { email: userEmail } = await getDataFromToken(request);

    await dbClient.user.delete({
      where: { email: userEmail },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting user:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
