import { Request, Response } from "express";
import { client, CONSTANTS } from "../configurations";

const getLinks = async (req: Request, res: Response) => {
  const data = await client.lRange(CONSTANTS.TABLE_NAME, 0, -1);
  res.status(200).send({
    links: data,
  });
};

export { getLinks };
