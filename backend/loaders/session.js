import mongostore from "connect-mongo";
const {default : env} = require('../config/index');
//mongo -> mongosessoin
//mysql -> mysqlsessoin
function SessionAdapter(session) {
  let CurrentSession;
  if (session === "mongo") {
    CurrentSession = mongostore.create({
      mongoUrl: env.dbUrl,
      dbName: "LINKHU",
      
    });
  }
  return CurrentSession;
}

export default SessionAdapter;
