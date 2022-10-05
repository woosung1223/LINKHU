const dotenv = require('dotenv');
dotenv.config();

export default {
    port : process.env.PORT,
    sessionSecret : process.env.SessionSecret,
    nodeEnv : process.env.NODE_ENV,
    dbUrl : process.env.DB_URL,
}