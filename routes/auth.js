const express = require('express');
const crypto = require('crypto');

const router = express.Router();

router.post('/signup', (req, res) => {
    // 회원가입 로직
    const paramId = req.body.id;
    const paramPw = req.body.password;
    const salt = Math.round((new Date().valueOf() * Math.random())) + "";
    const hashPassword = crypto.createHash("sha512").update(paramId + salt).digest("hex");
    console.log(hashPassword);

    const param = {
        userId : req.body.id,
        userPassword : hashPassword,
        salt : salt,
    }
    
    // mongo DB connect

    // end
    res.send('회원가입 페이지!');
});

router.post('/login', (req, res) => {
    const paramId = req.body.id;
    const paramPw = req.body.password;

    if(req.session.user) {
        const hashPassword = crypto.createHash('sha512').update(paramPw + req.session.salt).digest("hex");
        if (paramId == req.session.userId && 
            paramPw == hashPassword) {
                req.session.is_logined = true;
                console.log('login success, ID : ', paramId);
                res.redirect('/');  
            }
    } else {
        res.send('회원가입을 먼저 하세요!');
    }
});

router.get('/logout', async function (req, res) {
    try {
        if (req.session) {
            await req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect('/');
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;