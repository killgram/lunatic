import { Request, Response, NextFunction } from "express";

interface IBody {
  link?: string;
}
const checkLink = (
  req: Request<{}, {}, IBody>,
  res: Response,
  next: NextFunction
) => {
  const { link }: IBody = req.body;
  if (!link) {
    return res.status(401).send({
      title: "missing query params",
      success: false,
    });
  } else {
    next();
  }
};

export { checkLink };
