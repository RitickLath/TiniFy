import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";

const JWT_SECRET = process.env.JWT_SECRET || "PasswordIsPassword";

export const generateTinyUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body || {};
    const { userId } = req.body;

    // Validate input
    if (!url) {
      res.status(400).json({
        success: false,
        message: "URL is required to generate a shortened link.",
      });
      return;
    }

    // Generating a JWT containing userId and URL and time - for more unique
    const token = jwt.sign({ userId, url, createdAt: Date.now() }, JWT_SECRET, {
      expiresIn: "30d",
    });

    let foundUnique = false;
    let Index = 0;
    let shortUrl = token.slice(Index, Index + 7);

    // Find a unique short code
    while (!foundUnique) {
      const existingUrl = await prisma.uRLs.findFirst({
        where: { redirectedURL: shortUrl },
      });

      if (!existingUrl) {
        foundUnique = true;
        break;
      }

      Index++;

      // Safety check to avoid infinite loop if token length reached
      if (Index + 7 >= token.length) {
        res.status(500).json({
          success: false,
          message: "Failed to create a unique short URL. Please try again.",
        });
        return;
      }

      shortUrl = token.slice(Index, Index + 7);
    }

    // Store the shortened URL into the database
    const createdUrl = await prisma.uRLs.create({
      data: {
        originalURL: url,
        redirectedURL: shortUrl,
        creationDate: new Date(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        user: {
          connect: { id: userId },
        },
      },
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Shortened URL created successfully.",
      data: {
        originalURL: createdUrl.originalURL,
        shortURL: `http://localhost:3000/api/v1/${createdUrl.redirectedURL}`,
        expirationDate: createdUrl.expirationDate,
      },
    });
    return;
  } catch (error) {
    console.error("[generateTinyUrl Error]", error);

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the shortened URL.",
    });
    return;
  }
};
