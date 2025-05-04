import express from "express";
import { PrismaClient } from "../src/generated/prisma";
import { userRouter, urlRouter, analyticsRouter } from "./routes";
import { handleRedirect } from "./controllers/handle-redirect-controller";
import { job } from "./config/cron-job";
import cors from "cors";

job(); // running cron job
export const prisma = new PrismaClient();
export const app = express();
app.use(cors());

app.use(express.json());

app.get("/api/v1/:short", handleRedirect);

app.use("/api/v1/auth", userRouter);

app.use("/api/v1/generate", urlRouter);

app.use("/api/v1/analytics", analyticsRouter);
