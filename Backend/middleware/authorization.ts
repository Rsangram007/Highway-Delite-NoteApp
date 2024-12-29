import { Request, Response, NextFunction } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import env from "dotenv";
env.config();

interface CustomRequest extends Request {
  user?: { userId: string };
}

const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    // console.log("payload",payload)
    req.user = { userId: payload.userId }; // Attach user data to req
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Forbidden" });
  }
};

export default auth;
