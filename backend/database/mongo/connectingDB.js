const mongoose = require("mongoose");
import env from "../../config/index";

function ConnectingMongoDatabase() {
  if (process.env.NODE_ENV == "dev") {
    mongoose.set("debug", true);
  }

  mongoose.connect(
    env.dbUrl,
    {
      dbName: "LINKHU",
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mongo Dababase connected");
      }
    }
  );
  mongoose.connection.on("error", (error) => {
    console.error("Mongo DB error occured", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("mongoDB disconnected, connecting...");
  });
}

export default ConnectingMongoDatabase;
