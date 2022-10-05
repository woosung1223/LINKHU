import Database from '../database/mongo/mongoDB';
import bcrypt from 'bcrypt';
import response from '../config/response'
const AuthService = {
    
    SignUp : async function(userAttribute) {
        // userAttribute : 유저 정보를 담고 있는 객체
        try {
            const idQuery = await Database.getUserbyField('userId', userAttribute.id);
            // unique한 ID 값을 통해 해당 유저가 이미 있는지 Read
            const emailQuery = await Database.getUserbyField('email', userAttribute.email);
            // unique한 email 값을 통해 해당 유저가 이미 있는지 Read
            if (idQuery.length) { // ID 가 이미 존재한다면 
                return response.ID_ALREADY_EXISTS;
            }
            else if (emailQuery.length) { // email 이 이미 사용중이라면
                return response.EMAIL_ALREADY_EXISTS;
            }
            else { // 회원가입 (Create)
                const CreateResult = await Database.CreateUser({
                    name : userAttribute.userName,
                    userId : userAttribute.id,
                    email : userAttribute.email,
                    password : userAttribute.password,
                });
                if (CreateResult) {
                    return response.SUCCESS;
                }
                else {
                    return response.INTERNAL_ERR;
                } 
            }
        } catch(e) {
            console.log('error occured in AuthService(SignUp), error : ', e);
        }
    },
    Login : async function(userAttribute) {
        // userAttribute : 유저 정보를 담고 있는 객체
        const userinfo_query = await Database.getUserbyField('userId', userAttribute.id);
        if (userinfo_query.length) {
            const password = userinfo_query[0]['password'];
            const match = await bcrypt.compare(userAttribute.password, password);
            if(match) {
                console.log('login success, ID : ', userAttribute.id);
                return response.SUCCESS;
            }
            else {
                return response.PW_NOT_MATCH;
            }
        } 
        else {
            return response.ID_NOT_EXISTS;
        }

    },
    Logout : async function(userAttribute) {
        // userAttribute : 유저 정보를 담고 있는 객체

    }
}

export default AuthService;
