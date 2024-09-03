import { Server } from "http";
import app from "./app";
import dbConnected from "./app/uitls/database";
import config from "./app/config";



// database connected
dbConnected();
// handle uncaught rejection


  const server:Server = app.listen(config.port, () => {
  console.log(`server is running at port: ${config.port}`);
});

process.on("unhandledRejection", () => {
  console.log("unhandleRejection is detected, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//handle uncaught exceptions

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected, shutting down...");
  process.exit(1);
});
