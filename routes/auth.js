const express = require('express');
const crypto = require('crypto');

const User = require('../schemas/user');
const { query } = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
    // 회원가입 로직
    const paramId = req.body.id;
    const paramPw = req.body.password;
    const paramEmail = req.body.email;
    const paramName = req.body.userName;

    const salt = Math.round((new Date().valueOf() * Math.random())) + ""; // salt 값 생성
    const hashPassword = crypto.createHash("sha512").update(paramPw + salt).digest("hex"); // sha512 사용 password 암호화

    const idQuery = await User.find({userId : paramId}); // unique한 ID 값을 통해 해당 유저가 이미 있는지 Read
    const emailQuery = await User.find({email : paramEmail}); // unique한 email 값을 통해 해당 유저가 이미 있는지 Read
    if (idQuery.length) { // ID 가 이미 존재한다면 
        res.send('user already exists!');
    }
    else if (emailQuery.length) { // email 이 이미 사용중이라면
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

router.post('/login', async (req, res) => {
    try {
    const paramId = req.body.id;
    const paramPw = req.body.password;
    if(req.session.userId === undefined) { // 세션이 만료되었거나 없다면
        const id_query = await User.find({userId : paramId});
        if(id_query.length) { // 아이디가 존재한다면
            const id_pwd_query = await User.find({userId : paramId}, {password : 1, salt : 1}); // 구조분해 할당
            const {password, salt} = id_pwd_query[0];
            const hashPassword = crypto.createHash('sha512').update(paramPw + salt).digest("hex");
            
            if (hashPassword == password) { // db password와 일치한다면
                req.session.is_logined = true;
                req.session.userId = paramId;
                console.log('login success, ID : ', paramId);
                res.send('로그인 성공! 세션 드림');
            }
            else { // 비밀번호가 일치하지 않는다면 
                res.send('비밀번호 불일치!');
            }
        }
        else {
            res.send('아이디가 존재하지 않아용');
        }
    }
    else { // 이미 세션 있는 경우
        res.send('이미 세션이 있어요');
    }
} catch(err) {
    console.error(err);
}
});

router.get('/logout', async function (req, res) {
    try {
        if (req.session.userId !== undefined) { // 세션이 존재한다면
            await req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.clearCookie('connect.sid');
                    res.send('logout completed');
                }
            });
        } 
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;