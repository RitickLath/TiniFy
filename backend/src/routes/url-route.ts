import express from "express";
import { generateTinyUrl } from "../controllers/url-controller";

export const urlRouter = express.Router();

// generate the short url
urlRouter.post("/", generateTinyUrl);
