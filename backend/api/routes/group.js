import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is group home page');
});

router.get('/:groupname', (req, res) => {
    res.send(`this is ${req.params.groupname} page.`);
});

router.get('/:groupname/:id', (req, res) => {
    res.send(`this is ${req.params.groupname} group ${req.params.id} id page.`);
});

export default router;