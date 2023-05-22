import { Request, Response, NextFunction } from "express";
import { CONSTANTS } from "../configurations";

const verification = <Body, Query>(
  req: Request<{}, {}, Body, Query>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token: string = authHeader.split(" ")[1];
    if (token === CONSTANTS.EDIT_KEY) {
      next();
    } else {
      return res.status(403).send({
        title: "forbidden",
        success: false,
      });
    }
  } else {
    return res.status(403).send({
      title: "forbidden",
      success: false,
    });
  }
};

export { verification };
