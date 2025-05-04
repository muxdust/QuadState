import jwt from "jsonwebtoken";

export default async function getDataFromToken(request) {
  try {
    const cookies = request.cookies;
    const token = cookies.get("auth-token")?.value;

    if (!token) {
      console.log("No token found");
      return null;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        console.log("Invalid token");
        return null;
      }

      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        cookies.delete("auth-token");
        console.log("Expired token removed from cookies");
      }
      console.error("Error in getDataFromToken:", error);
      return null;
    }
  } catch (error) {
    console.error("Error in getDataFromToken:", error);
    return null;
  }
}
