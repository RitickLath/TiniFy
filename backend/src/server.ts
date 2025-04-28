import { prisma, app } from ".";
import { RedisConnect } from "./config/redis-config";
const port = process.env.PORT || 3000;

// start redis -> connect to database -> start server
const startServer = async () => {
  await RedisConnect();
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
