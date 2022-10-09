import {check, cookie} from 'express-validator';
// post 요청에 한해 validation check 를 수행
// front-end 에서도 check 하지만, web-based request가 아닌 경우를 위해 double-check
const validationMiddleware = [
    // check('id')
    //     .isLength({min : 8}),
    // check('password')
    //     .isLength({min : 8}),
    // check('email')
    //     .isEmail(),
    //     // 쿠키 값 처리도 가능?
    //     // 일단 비워둠
    ];

export default validationMiddleware;