function SessionMiddleware(req, res, next) {
    // session validation check middleware
    try {
        if (req.method == 'POST') { // login인 경우
            if (req.session.isLogined === undefined) { // 세션이 없다면
                next();
            }
            else { // 세션이 있다면
                res.send('이미 세션이 있어요');
            }
        }
        else if (req.method == 'GET') { // logout인 경우
            if (req.session.isLogined == true) { // 세션이 존재한다면
                next();
            }
            else {
                res.send('로그아웃할 세션이 없어요');
            } 
        }    
    } catch (e) {
        console.log(e);
    }
}

export default SessionMiddleware;