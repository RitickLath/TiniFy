import express from "express";
import { PrismaClient } from "../src/generated/prisma";
import { userRouter } from "./routes/user-route";
export const prisma = new PrismaClient();
export const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/auth", userRouter);
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
