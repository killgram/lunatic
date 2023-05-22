import { Request, Response } from "express";
import { client, CONSTANTS } from "../configurations";
import { ICheckLinkBody } from "../middleware";

const setLink = async (req: Request<{}, {}, ICheckLinkBody>, res: Response) => {
  const { link }: ICheckLinkBody = req.body;
  await client.rPush(CONSTANTS.TABLE_NAME, link);
  res.status(200).send({
    title: `Successfully add ${link}`,
    success: true,
  });
};

export { setLink };
