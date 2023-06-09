import { Request, Response, NextFunction } from "express";

export interface ICheckLinkBody {
  link: string;
}
const checkLink = (
  req: Request<{}, {}, ICheckLinkBody>,
  res: Response,
  next: NextFunction
) => {
  const { link }: ICheckLinkBody = req.body;
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
