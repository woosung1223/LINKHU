// include packages
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const mongo_connect = require('./schemas/index'); 
require("dotenv").config(); // .env 

const app = express();
// environment setting
app.set('port', process.env.PORT || 3001);
mongo_connect();

// middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false }));
app.use(
    session({
        httpOnly : true,
        secret: process.env.SessionSecret,
        resave : false,
        saveUninitialized : false,
        // store : require('mongoose-session')(mongoose),
        cookie : {
            httpOnly : true,
            cookie : {maxAge:(3.6e+6) * 1} // 1시간 뒤 만료 
        }
    })
)

// routers
const tgwingRouter = require('./routes/group'); // 동아리
const authRouter = require('./routes/auth'); // 인증 
const { connect } = require('http2');

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
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// listener
app.listen(app.get('port'), () => {
    console.log(`Server listening ${app.get('port')}`);
});