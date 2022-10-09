import express from 'express';
import editService from '../../services/editService';
import sessionCheckMiddleware from '../middlewares/sessionCheckMW';
import validationMiddleware from '../middlewares/validationMW';
import {validationResult} from 'express-validator';
import upload from '../middlewares/fileUploader/s3Uploader';
import path from 'path';
const router = express.Router();
router.post('/', sessionCheckMiddleware, validationMiddleware, async (req, res) => {
    // 회원정보 수정
    const errors = validationResult(req);
    if(!errors.isEmpty()) { // 에러 존재하는지 검사
        res.status(400).send({message : errors.array()}); // 존재할 시 에러들을 array 형태로 반환
    }
    else {
        const userDTO = req.body;
        const {message} = await editService.saveInfo(userDTO);
        res.send(message);
    }
}); 
router.post('/image', sessionCheckMiddleware, validationMiddleware,
 upload.single('image'), async (req, res) => {
    // 프로필 사진 수정
    const errors = validationResult(req);
    if(!errors.isEmpty()) { // 에러 존재하는지 검사
        res.status(400).send({message : errors.array()}); // 존재할 시 에러들을 array 형태로 반환
    }
    else {
        const userDTO = {
            id : req.body.id,
            baseUrl : path.basename(req.file.location), // User에 저장될 location 값
        };
        const {message} = await editService.saveImage(userDTO);
        res.send(message);
    }
});

export default router;