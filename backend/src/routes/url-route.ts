import express from "express";
import { generateTinyUrl } from "../controllers/url-controller";

export const urlRouter = express.Router();

// generate the short url
// will add the middleware
urlRouter.post("/", generateTinyUrl);
