import express from 'express';
const router = express.Router();

router.get('/', sessionCheckMiddleware, (req, res) => {
    res.send('this is group home page');
});

router.get('/:groupname', sessionCheckMiddleware, (req, res) => {
    res.send(`this is ${req.params.groupname} page.`);
});

router.get('/:groupname/:id', sessionCheckMiddleware, (req, res) => {
    res.send(`this is ${req.params.groupname} group ${req.params.id} id page.`);
});

export default router;