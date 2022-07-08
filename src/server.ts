import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import transactionRouters from "./routes/Transactions";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("ERROR MONGODB");
    console.log(error);
  });

router.use((req, res, next) => {
  console.log(
    `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    console.log(
      `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  });

  next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/**API rules */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/**My routes */
router.use("/transactions", transactionRouters);

/**ERROR handler */
router.use((_req, res, _next) => {
  const error = new Error("Not found");
  console.log(error);

  return res.status(404).json({ message: error.message });
});

router.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}.`);
});
