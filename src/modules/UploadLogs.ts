import { client, CONSTANTS } from "../configurations";

const uploadLogs = async () => {
  const data: string[] = await client.lRange(CONSTANTS.LOG_TABLE, 0, -1);
  const cTime: Date = new Date();
  const cMonth: number = cTime.getMonth() + 1;
  const cDay: number = cTime.getDate();
  const cYear: number = cTime.getFullYear();
  const cHours: number = cTime.getHours();
  const cMinutes: number = cTime.getMinutes();
  const cSeconds: number = cTime.getSeconds();
  const cMilliseconds: number = cTime.getMilliseconds();

  const dbString: string = `${cDay}_${cMonth}_${cYear}/${cHours}:${cMinutes}:${cSeconds}:${cMilliseconds}`;

  try {
    await client.lTrim(CONSTANTS.LOG_TABLE, 99, 0);
  } catch (e) {
    console.log("__LOGS_Error_Upload__");
  }

  return null;
};

export { uploadLogs };
