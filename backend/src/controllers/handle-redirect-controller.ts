import { Request, Response } from "express";
import { prisma } from "..";

export const handleRedirect = async (req: Request, res: Response) => {
  try {
    const { short } = req.params;
    console.log(short);

    if (!short) {
      res.status(400).json({
        success: false,
        message: "Invalid request. Missing userId or short URL.",
      });
      return;
    }

    // Find the original URL
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

    // Check if URL is expired
    if (data.expirationDate < currentTime) {
      // URL expired, delete it
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
    // Redirect user to the original URL (even before analytics part heppen to make the speed optimization)
    res.redirect(data.originalURL);

    // Record analytics
    const userAgent = req.headers["user-agent"] || "unknown";
    const referer = req.headers["referer"] || "direct";
    const ipAddress = req.ip || "Protected";

    // now awaiting for instant thread free.
    prisma.analytics.create({
      data: {
        deviceType: userAgent,
        referer: referer,
        ipAddress: ipAddress,
        urlId: data.id,
      },
    });
  } catch (error) {
    console.error("[handleRedirect Error]", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while redirecting.",
    });
  }
};
