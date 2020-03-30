import express from 'express';
import PageCtrl from '../controllers/PageCtrl';
const router = express.Router();

router.get('/', PageCtrl.index);
router.get('/:room', PageCtrl.board);

export default router;
