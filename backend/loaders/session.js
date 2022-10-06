import mongostore from "connect-mongo";

//mongo -> mongosessoin
//mysql -> mysqlsessoin
function SessionAdapter(session) {
  let CurrentSession;
  if (session === "mongo") {
    CurrentSession = mongostore.create({
      mongoUrl: process.env.DB_URL,
      dbName: "LINKHU",
    });
  }
  return CurrentSession;
}

export default SessionAdapter;
