import { client, CONSTANTS } from "../configurations";
import { notificationLogService } from "../services";
import fs from "fs";

const uploadLogs = async () => {
  const data: string[] = await client.lRange(CONSTANTS.LOG_TABLE, 0, -1);
  try {
    await fs.writeFileSync("logs.json", JSON.stringify(data));
    await notificationLogService(data);
    await client.lTrim(CONSTANTS.LOG_TABLE, 99, 0);
  } catch (e) {
    console.log("__LOGS_Error_Upload__");
  }

  return null;
};

export { uploadLogs };
