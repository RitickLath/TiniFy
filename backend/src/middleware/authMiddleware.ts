import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { prisma } from "..";

const JWT_SECRET = process.env.JWT_SECRET || "PasswordIsPassword";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        status: false,
        message: "Unauthorized: No token provided",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    let decoded: { userId: number; email: string };

    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: number;
        email: string;
      };
      console.log("[AUTH] Decoded JWT:", decoded);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log("[AUTH] Token has expired");
        res.status(401).json({
          status: false,
          message: "Token expired. Please log in again.",
        });
        return;
      }

      console.log("[AUTH] Invalid token:", error);
      res.status(401).json({
        status: false,
        message: "Invalid token",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      console.log("[AUTH] User not found for ID:", decoded.userId);
      res.status(401).json({
        status: false,
        message: "Unauthorized: User does not exist",
      });
      return;
    }

    (req as any).user = decoded;
    console.log("[AUTH] Auth successful. User attached to request.");
    next();
  } catch (error) {
    console.error("[AUTH] Middleware error:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
