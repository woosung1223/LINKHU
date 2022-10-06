import express from 'express';
import AuthService from '../../services/authService';
import SessionMiddleware from '../middlewares/sessionMiddleware';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const userDTO = req.body;
        const {message} = await AuthService.SignUp(userDTO);
        res.send(message);

    } catch (e) {
        console.error(e);
     }
    });

router.post('/login', SessionMiddleware, async (req, res) => {
    try {
        const userDTO = req.body;
            const {code, message} = await AuthService.Login(userDTO);
            
            if (code == 1) {
                req.session.is_logined = true;
                req.session.userId = userDTO.id;
            }
            res.send(message);
        } catch (err) {
        console.error(err);
    }
});

router.get('/logout', SessionMiddleware, async function (req, res) {
    try {
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
    catch (e) {
        console.log(e);
    }
});

export default router;