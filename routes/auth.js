const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    // 회원가입 로직
    res.send('회원가입');
});

router.get('/login', (req, res) => {
    res.send('로그인');
});

router.get('/logout', (req, res) => {
    res.send('로그아웃');
});

module.exports = router;