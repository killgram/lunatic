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
} from "./modules";
import { CONSTANTS, initBitbucket, initRedisClient } from "./configurations";
import { verification, checkLink } from "./middleware";

// scheduler
const scheduler = new ToadScheduler();
const keepAwakeTask = new Task("keep awake", () => keepAwake());
const keepAwakeJob = new SimpleIntervalJob(
  // { minutes: CONSTANTS.UPDATE_TIME },
  { seconds: CONSTANTS.UPDATE_TIME },
  keepAwakeTask
);
scheduler.addSimpleIntervalJob(keepAwakeJob);

// configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev")); // logger
app.use(responseTime({ header: "work-time" })); // ms in header

// GET
app.get("/status", getWorkStatus);
app.get("/getLinks", verification, getLinks);

// POST
app.post("/setLink", verification, checkLink, setLink);
app.post("/deleteLink", verification, checkLink, deleteLink);

// init redis
initRedisClient();
// init bitbucket
initBitbucket();

// listener
app.listen(PORT, (): void => {
  console.log(`Server running on port here 👉 ${PORT}`);
});
