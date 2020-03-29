import express from 'express';
import PageCtrl from '../controllers/PageCtrl';
const router = express.Router();

router.get('/', PageCtrl.index);
export default router;
