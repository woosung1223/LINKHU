export default {
    
    SUCCESS : {isSuccess: true, code: 1, message: '성공'},
    ID_ALREADY_EXISTS : {isSuccess: false, code: 2, message: '아이디가 이미 존재합니다'},
    ID_NOT_EXISTS : {isSuccess: false, code: 3, message: '아이디가 존재하지 않습니다'},
    EMAIL_ALREADY_EXISTS : {isSuccess: false, code: 4, message: '이메일이 이미 사용중입니다'},
    PW_NOT_MATCH : {isSuccess: false, code: 5, message: '비밀번호가 맞지 않습니다'},
    INTERNAL_ERR : {isSuccess: false, code: 0, message: '내부 서버 오류입니다'},
    NOT_LOGINED : {isSuccess: false, code: -1, message: '로그인되지 않았습니다'},
};