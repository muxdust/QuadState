import jwt from "jsonwebtoken";

export default async function getDataFromToken(request) {
  try {
    const cookies = request.cookies;
    const token = cookies.get("auth-token")?.value;

    if (!token) {
      console.log("No token found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Invalid token");
    }

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Error in getDataFromToken:", error);
  }
}
