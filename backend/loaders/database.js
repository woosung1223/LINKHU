import MongoDatabaseConnection from "../database/mongo/connectingDB";

async function ConnectDatabase() {
  await MongoDatabaseConnection();
}

export default ConnectDatabase;
