import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 9987;
const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
import bodyParser from "body-parser";
const morgan = require("morgan");
const responseTime = require("response-time");

import {
  getWorkStatus,
  keepAwake,
  setLink,
  deleteLink,
  getLinks,
  uploadLogs,
  getLogs,
  getLogsFile,
  getDBLogs,
} from "./modules";
import { CONSTANTS, initBitbucket, initRedisClient } from "./configurations";
import {
  verification,
  checkLink,
  checkLogs,
  ICheckLinkBody,
  ICheckLogsBody,
  ICheckLogsFileBody,
  checkLogsFile,
} from "./middleware";

// scheduler
const scheduler = new ToadScheduler();

const keepAwakeTask = new Task("keep awake", () => keepAwake());
const keepAwakeJob = new SimpleIntervalJob(
  { minutes: CONSTANTS.UPDATE_TIME },
  keepAwakeTask
);
scheduler.addSimpleIntervalJob(keepAwakeJob);

const uploadLogsTask = new Task("upload logs", () => uploadLogs());
const uploadLogsJob = new SimpleIntervalJob(
  { minutes: CONSTANTS.UPLOAD_UPDATE_TIME * 24 },
  uploadLogsTask
);
scheduler.addSimpleIntervalJob(uploadLogsJob);

// configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev")); // logger
app.use(responseTime({ header: "work-time" })); // ms in header

// GET
app.get("/status", getWorkStatus);
app.get("/getLinks", verification<{}, {}>, getLinks);
app.get("/getDBLogs", verification<{}, {}>, getDBLogs);
app.get("/getLogs", verification<{}, ICheckLogsBody>, checkLogs, getLogs);
app.get(
  "/getLogsFile",
  verification<{}, ICheckLogsFileBody>,
  checkLogsFile,
  getLogsFile
);

// POST
app.post("/setLink", verification<ICheckLinkBody, {}>, checkLink, setLink);
app.post(
  "/deleteLink",
  verification<ICheckLinkBody, {}>,
  checkLink,
  deleteLink
);

// init redis
initRedisClient().then((_) => {});
// init bitbucket
initBitbucket().then((_) => {});

// listener
app.listen(PORT, (): void => {
  console.log(`Server running on port here 👉 ${PORT}`);
});
