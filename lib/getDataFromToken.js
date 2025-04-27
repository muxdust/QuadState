import jwt from "jsonwebtoken";

export default async function getDataFromToken(request) {
  try {
    const cookies = request.cookies;
    const token = cookies.get("auth-token")?.value;

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }

    return {
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Error in getDataFromToken:", error);
    throw new Error("Token verification failed");
  }
}
