const express = require('express');
const crypto = require('crypto');

const User = require('../schemas/user');
const { query } = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.post('/signup', async function(req, res) {
    try {
    // 회원가입 로직
    const paramId = req.body.id;
    const paramPw = req.body.password;
    const paramEmail = req.body.email;
    const paramName = req.body.userName;

    const salt = Math.round((new Date().valueOf() * Math.random())) + "";
    const hashPassword = crypto.createHash("sha512").update(paramPw + salt).digest("hex");

    const query1 = await User.find({userId : paramId}); // unique한 ID 값을 통해 해당 유저가 이미 있는지 Read
    const query2 = await User.find({email : paramEmail}); // unique한 email 값을 통해 해당 유저가 이미 있는지 Read
    if (query1.length) { // ID 가 이미 존재한다면 
        res.send('user already exists!');
    }
    else if (query2.length) { // email 이 이미 사용중이라면
        res.send('email already used!');
    }
    else { // 회원가입 (Create)
        const newUser = new User({
            name : paramName,
            userId : paramId,
            email : paramEmail,
            password : hashPassword,
            salt : salt,
        });
        await newUser.save().then(() => {
            console.log(`${paramId} user generated.`);
        }).catch((err) => {
            console.error(err);
        });
        res.send('registeration completed.');
    }
} catch (e) {
    console.error(e);
}
});

router.post('/login', (req, res) => {
    const paramId = req.body.id;
    const paramPw = req.body.password;

    if(req.session.user) { // 유저 정보가 존재한다면 # 수정 필요
        const hashPassword = crypto.createHash('sha512').update(paramPw + req.session.user.salt).digest("hex");
        // console.log(paramId, paramPw);
        if (paramId == req.session.user.userId && 
            hashPassword == req.session.user.userPassword) {
                req.session.is_logined = true;
                console.log('login success, ID : ', paramId);
                res.send('로그인 성공!');
                // res.redirect('/group');      
            }
        else {
            res.send('비밀번호가 맞지 않아요');
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
                    res.redirect('/group');
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;