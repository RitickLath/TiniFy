import express, { Request, Response } from "express";
import { signin, signup, validate } from "../controllers/user-controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.get("/validate", authMiddleware, validate);
