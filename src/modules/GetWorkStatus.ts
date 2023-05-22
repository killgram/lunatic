import { Request, Response } from "express";

const getWorkStatus = (req: Request, res: Response) => {
  res.status(200).send({
    title: "Lunatic is working correctly",
    success: true,
  });
};

export { getWorkStatus };
