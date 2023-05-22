import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 9987;
const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
import bodyParser from "body-parser";
const morgan = require("morgan");

import { getWorkStatus, keepAwake, setLink } from "./modules";
import { CONSTANTS, initRedisClient } from "./configurations";
import { verification, checkSetLink } from "./middleware";

// // scheduler
// const scheduler = new ToadScheduler();
// const keepAwakeTask = new Task("keep awake", () => keepAwake());
// const keepAwakeJob = new SimpleIntervalJob(
//   { minutes: CONSTANTS.UPDATE_TIME },
//   keepAwakeTask
// );
// scheduler.addSimpleIntervalJob(keepAwakeJob);

// configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev")); // logger

// GET
app.get("/status", getWorkStatus);

// POST
app.post("/setLink", verification, checkSetLink, setLink);

// init redis
initRedisClient();

// listener
app.listen(PORT, (): void => {
  console.log(`Server running on port here 👉 ${PORT}`);
});
