import { Router } from 'express';
import auth from './auth.js';
import protectd from './protected.js';
import profile from './profile.js';
import staff from './staff.js';
import supplier from './supplier.js';
const router = Router();

router.use(auth);
router.use(protectd);
router.use(profile);
router.use(staff);
router.use(supplier);

export default router;
