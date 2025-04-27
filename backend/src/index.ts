import express from "express";
import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
