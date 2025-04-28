import { Request, Response } from "express";
import { prisma } from "..";
import { redisClient } from "../config/redis-config";

export const handleRedirect = async (req: Request, res: Response) => {
  try {
    const { short } = req.params;

    // Step 1: Check if the short URL exists
    if (!short) {
      res.status(400).json({
        success: false,
        message: "Invalid request. Missing short URL.",
      });
      return;
    }

    // Step 2: Check if the shortURL exists in the Redis cache

    const ExistsInRedisCache = await redisClient.get(short);
    if (ExistsInRedisCache) {
      res.redirect(ExistsInRedisCache);
      console.log("Redirection happens from Redis");
      return;
    }

    // Step 3: Find the original URL in the database
    const data = await prisma.uRLs.findFirst({
      where: { redirectedURL: short },
    });

    if (!data) {
      res.status(404).json({
        success: false,
        message: "No such short URL exists or maybe expired.",
      });
      return;
    }

    const currentTime = new Date();

    // Step 4: Check if URL is expired
    if (data.expirationDate < currentTime) {
      // URL expired, delete
      await prisma.uRLs.delete({
        where: {
          id: data.id,
        },
      });
      res.status(410).json({
        success: false,
        message: "URL has expired.",
      });
      return;
    }

    // Step 5: Redirect user to the original URL (even before analytics part for speed optimization)
    res.redirect(data.originalURL);

    // Step 6: Set the original URL in Redis cache with expiration time
    const timeRemaining = data.expirationDate.getTime() - currentTime.getTime(); // in milliseconds
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in ms
    const threeDaysInMilliseconds = 3 * oneDayInMilliseconds; // 3 days in ms

    // If expiration is more than 3 days away, set a 3 days expiration
    if (timeRemaining > threeDaysInMilliseconds) {
      await redisClient.set(short, data.originalURL, {
        EX: threeDaysInMilliseconds / 1000,
      });
    } else {
      // Else set the expiry time as same as the database time left
      await redisClient.set(short, data.originalURL, {
        EX: timeRemaining / 1000,
      });
    }

    // Step 7: Record analytics (non-blocking)
    const userAgent = req.headers["user-agent"] || "unknown";
    const referer = req.headers["referer"] || "direct";
    const ipAddress = req.ip || "Protected";

    prisma.analytics
      .create({
        data: {
          deviceType: userAgent,
          referer: referer,
          ipAddress: ipAddress,
          urlId: data.id,
        },
      })
      .catch((err) => console.error("[Analytics Error]", err));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while redirecting.",
    });
  }
};
