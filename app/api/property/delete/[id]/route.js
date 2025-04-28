import getDataFromToken from "@/lib/getDataFromToken";
import { NextResponse } from "next/server";
import dbClient from "@/prisma/dbClient";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { id: userId } = await getDataFromToken(request);

    console.log(id, userId);

    await dbClient.property.delete({
      where: { id: id, userId: userId },
    });

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete property" },
      { status: 500 }
    );
  }
}
