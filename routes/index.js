import { Router } from 'express';
import auth from './auth.js';
import protectd from './protected.js';
import profile from './profile.js';
import staff from './staff.js';
const router = Router();

router.use(auth);
router.use(protectd);
router.use(profile);
router.use(staff);

export default router;
