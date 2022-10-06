import express from 'express';
import editService from '../../services/editService';
const router = express.Router();
router.post('/', async (req, res) => {
    // 회원정보 수정
    const userDTO = req.body;
    const {message} = await editService.saveInfo(userDTO);
    res.send(message);
}); 

router.post('/image', (req, res) => {
    // 프로필 사진 수정
    const userDTO = req.body.image;
    const {message} = editService.saveImage(userDTO);
    res.send(message);
});

export default router;