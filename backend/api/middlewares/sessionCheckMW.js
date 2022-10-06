import response from '../../config/response';

async function sessionCheckMiddleware(req, res, next) {
    if (req.session.isLogined == true) {
        next();
    }
    else {
        res.send(response.NOT_LOGINED);
    }
}


export default sessionCheckMiddleware;