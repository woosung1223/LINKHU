// include packages
import express from "express";
const { default: env } = require("./config/index");
import loader from "./loaders/index";
// environment setting

async function startServer() {
  const app = express();
  await loader({ expressApp: app });

  app.listen(env.port, () => {
    console.log(`Server listening ${env.port}`);
  });
}

startServer();
