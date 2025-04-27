import express from "express";
import { PrismaClient } from "../src/generated/prisma";
import { userRouter } from "./routes/user-route";
import { urlRouter } from "./routes/url-route";
export const prisma = new PrismaClient();
export const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/auth", userRouter);

app.use("/api/v1/generate", urlRouter);

const startServer = async () => {
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
