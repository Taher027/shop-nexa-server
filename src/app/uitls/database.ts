import mongoose from "mongoose";
import config from "../config";

const dbConnected = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Ping! Database Connected");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnected;
