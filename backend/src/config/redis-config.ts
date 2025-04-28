import { createClient } from "redis";

const url = process.env.REDIS || "redis://localhost:6379";

export const redisClient = createClient({ url: url });

export const RedisConnect = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Running on PORT: " + url);
  } catch (error: any) {
    console.log("Error While connecting to Redis Client: " + error.message);
  }
};
