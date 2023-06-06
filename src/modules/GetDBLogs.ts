import { Request, Response } from "express";
import { client, CONSTANTS } from "../configurations";

const getDBLogs = async (req: Request, res: Response) => {
  const data = await client.lRange(CONSTANTS.LOG_TABLE, 0, -1);
  const parseData: Array<[]> = [];
  data?.forEach((v) => {
    parseData.push(...JSON.parse(v));
  });
  res.status(200).send({
    logs: parseData,
  });
};

export { getDBLogs };
