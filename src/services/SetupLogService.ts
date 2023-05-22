import { client, CONSTANTS } from "../configurations";

const setupLogService = async (data: string) => {
  try {
    await client.rPush(CONSTANTS.LOG_TABLE, data);
  } catch (e) {
    return null;
  }
};

export { setupLogService };
