import { createClient } from "redis";
import { CONSTANTS } from "./Constants";

const client = createClient({
  password: CONSTANTS.REDIS_PASS,
  username: CONSTANTS.REDIS_USER,
  socket: {
    host: CONSTANTS.REDIS_HOST,
    port: CONSTANTS.REDIS_PORT,
  },
});

const initRedisClient = async (): Promise<void> => {
  await client.connect();
};

export { client, initRedisClient };
