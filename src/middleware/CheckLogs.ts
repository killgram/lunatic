import { Request, Response, NextFunction } from "express";

export interface ICheckLogsBody {
  day: string;
  month: string;
  year: string;
}
const checkLogs = (
  req: Request<{}, {}, {}, ICheckLogsBody>,
  res: Response,
  next: NextFunction
) => {
  const { day, year, month }: ICheckLogsBody = req.query;
  if (!day || !year || !month) {
    return res.status(401).send({
      title: "missing query params",
      success: false,
    });
  } else {
    next();
  }
};

export { checkLogs };
