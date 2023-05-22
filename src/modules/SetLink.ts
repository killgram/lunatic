import { Request, Response } from "express";
import { client, CONSTANTS } from "../configurations";

interface IBody {
  link: string;
}
const setLink = async (req: Request<{}, {}, IBody>, res: Response) => {
  const { link }: IBody = req.body;
  await client.rPush(CONSTANTS.TABLE_NAME, link);
  res.status(200).send({
    title: `Successfully add ${link}`,
    success: true,
  });
};

export { setLink };
