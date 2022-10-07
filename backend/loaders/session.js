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
      ttl: 3600, // 1시간 유효
      
    });
  }
  return CurrentSession;
}

export default SessionAdapter;
