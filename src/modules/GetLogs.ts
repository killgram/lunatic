import { Request, Response } from "express";
import { bitbucketClient } from "../configurations";
import { ICheckLogsBody } from "../middleware";

const getLogs = async (
  req: Request<{}, {}, {}, ICheckLogsBody>,
  res: Response
) => {
  const { day, month, year } = req.query;
  const findString = `${day}_${month}_${year}`;
  const response: any[] = [];
  const file = bitbucketClient?.root?.children?.filter((file) =>
    file?.name?.startsWith(findString)
  );

  if (file?.length === 0 || !file) {
    return res.status(200).send({
      data: response,
    });
  }

  file.forEach((item) => {
    response.push(item.name);
  });

  res.status(200).send({
    data: response,
  });
};

export { getLogs };
