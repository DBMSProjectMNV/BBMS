import { Router } from 'express';
import auth from './auth.js';
import protectd from './protected.js';
const router = Router();

router.use('/auth', auth);
router.use(protectd);

export default router;
