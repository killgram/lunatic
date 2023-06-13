import axios from "axios";
import { WebhookConfig } from "../configurations";
import { getCurrentDate } from "../utils";
import fs from "fs";
import path from "path";

const notificationLogService = async (data: any) => {
  const {
    username,
    content,
    color,
    dateTitle,
    url,
    dataTitle,
    successTitle,
    successContent,
    errorTitle,
  } = WebhookConfig.NoticeDaemon;
  const logFilePath = path.join(process.cwd(), "logs.json");
  const file = await fs.createReadStream(logFilePath);

  let fieldsWithFile = [
    {
      name: dataTitle,
      value: file,
    },
  ];

  let fields = [
    {
      name: dateTitle,
      value: getCurrentDate(),
    },
  ];

  data?.forEach((v: any) => {
    if (v?.error) {
      fields.push({
        name: errorTitle,
        value: v?.url,
      });
    }
  });

  if (fields.length === 1) {
    fields.push({
      name: successTitle,
      value: successContent,
    });
  }

  try {
    const params = {
      username: username,
      embeds: [
        {
          title: content,
          color: color,
          fields: fields,
        },
      ],
    };

    const paramsWithFile = {
      username: username,
      embeds: [
        {
          title: content,
          color: color,
          fields: fieldsWithFile,
        },
      ],
    };

    await axios.post(url, params);

    await axios.post(url, paramsWithFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return null;
  } catch (e) {
    console.log((e as Error).message);
    console.log("__Notice_Error__");
    return null;
  }
};

export { notificationLogService };
