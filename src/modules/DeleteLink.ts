import { Request, Response } from "express";
import { client, CONSTANTS } from "../configurations";

interface IBody {
  link: string;
}
const deleteLink = async (req: Request<{}, {}, IBody>, res: Response) => {
  const { link }: IBody = req.body;
  await client.LREM(CONSTANTS.TABLE_NAME, 1, link);
  res.status(200).send({
    title: `Successfully delete ${link}`,
    success: true,
  });
};

export { deleteLink };
