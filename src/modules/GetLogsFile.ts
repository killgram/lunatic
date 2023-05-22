import { Request, Response } from "express";
import { bitbucketClient } from "../configurations";
import { ICheckLogsFileBody } from "../middleware";

const getLogsFile = async (
  req: Request<{}, {}, {}, ICheckLogsFileBody>,
  res: Response
) => {
  const { file } = req.query;

  const foundFile = bitbucketClient?.root?.children?.find((fileItem) =>
    fileItem?.name?.startsWith(file)
  );

  if (!foundFile) {
    return res.status(421).send({
      title: "Not found file",
      success: false,
    });
  }

  const data = await foundFile.downloadBuffer({});
  const temp = JSON.parse(data.toString());

  res.status(200).send({
    data: temp,
    success: true,
  });
};

export { getLogsFile };
