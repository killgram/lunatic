import { Request, Response } from "express";
import { client, CONSTANTS } from "../configurations";
import { ICheckLinkBody } from "../middleware";

const deleteLink = async (
  req: Request<{}, {}, ICheckLinkBody>,
  res: Response
) => {
  const { link }: ICheckLinkBody = req.body;
  await client.LREM(CONSTANTS.TABLE_NAME, 1, link);
  res.status(200).send({
    title: `Successfully delete ${link}`,
    success: true,
  });
};

export { deleteLink };
