import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    console.log("No token found");
    return response
      .status(401)
      .json({ success: false, message: "Unauthorized, token not defined" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Invalid token, cant decode!");
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized, invalid token" });
    }
    request.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Invalid token, throwed error!");
    return response
      .status(401)
      .json({ success: false, message: "Unauthorized, invalid token" });
  }
};
