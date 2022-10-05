// include packages
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import mongostore from 'connect-mongo';
const {default : env} = require('./config/index');
const app = express();
// environment setting


// middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false }));
app.use(
    session({
        httpOnly : true,
        secret: env.sessionSecret,
        resave : false,
        saveUninitialized : false,
        store : mongostore.create({mongoUrl: env.dbUrl, dbName : 'LINKHU'}),
        cookie : {
            httpOnly : true,
            cookie : {
                maxAge:3600, 
            } // 1시간 뒤 만료 
        }
    })
)
// routers
const {default : tgwingRouter} = require('./api/routes/group'); // 동아리
const {default : authRouter} = require('./api/routes/auth'); // 인증 

app.use('/group', tgwingRouter); 
app.use('/auth', authRouter);

// 404 handler
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
}); 

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = env.nodeEnv !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// listener
app.listen(env.port, () => {
    console.log(`Server listening ${env.port}`);
});