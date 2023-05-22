import { Request, Response, NextFunction } from "express";

export interface ICheckLogsFileBody {
  file: string;
}
const checkLogsFile = (
  req: Request<{}, {}, {}, ICheckLogsFileBody>,
  res: Response,
  next: NextFunction
) => {
  const { file }: ICheckLogsFileBody = req.query;
  if (!file) {
    return res.status(401).send({
      title: "missing query params",
      success: false,
    });
  } else {
    next();
  }
};

export { checkLogsFile };
