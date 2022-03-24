import { Router } from 'express';
import auth from './auth.js';
import protectd from './protected.js';
import profile from './profile.js';
const router = Router();

router.use(auth);
router.use(protectd);
router.use(profile);

export default router;
