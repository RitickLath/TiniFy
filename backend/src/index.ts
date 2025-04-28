import express from "express";
import { PrismaClient } from "../src/generated/prisma";
import { userRouter, urlRouter, analyticsRouter } from "./routes";
import { handleRedirect } from "./controllers/handle-redirect-controller";
import { RedisConnect } from "./config/redis-config";

export const prisma = new PrismaClient();
export const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/v1/:short", handleRedirect);

app.use("/api/v1/auth", userRouter);

app.use("/api/v1/generate", urlRouter);

app.use("/api/v1/alalytics", analyticsRouter);

const startServer = async () => {
  await RedisConnect();
  await prisma
    .$connect()
    .then(() => {
      app.listen(port, () => {
        console.log("Server is running at PORT:3000");
      });
    })
    .catch((e) => {
      console.log("Error Occured: " + e);
    });
};
startServer();
