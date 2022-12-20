import dotenv from "dotenv";
dotenv.config();

console.log("key is :", process.env.DB_URL);

export default {
  port: process.env.PORT,
  sessionSecret: process.env.SessionSecret,
  nodeEnv: process.env.NODE_ENV,
  dbUrl: process.env.DB_URL,
  AwsId: process.env.AWS_ID,
  AwsPw: process.env.AWS_SECRET,
};
