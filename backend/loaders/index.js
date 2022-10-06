import expressLoader from "./express";
import Connectingdatabase from "./database";

export default async ({ expressApp }) => {
  console.log("express app is:" + expressApp);
  await Connectingdatabase();
  console.log("MongoDB Intialized");
  await expressLoader({ app: expressApp });
  console.log("Express Intialized");
};
