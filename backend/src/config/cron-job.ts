import { CronJob } from "cron";
import { prisma } from "..";

export const job = () => {
  new CronJob(
    "0 4 * * * *", // 4AM every day
    async () => {
      const now = new Date();
      try {
        // Deleting URLs where expirationDate is less than the current date
        await prisma.uRLs.deleteMany({
          where: {
            expirationDate: {
              lt: now,
            },
          },
        });
        console.log("Expired URLs deleted successfully.");
      } catch (error) {
        console.error("Error deleting expired URLs:", error);
      }
    },
    null, // no callback after conmpletion
    true, // automatically start cron job
    "Asia/Kolkata"
  );
};
