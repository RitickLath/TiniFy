import express from "express";
import { signin, signup } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

