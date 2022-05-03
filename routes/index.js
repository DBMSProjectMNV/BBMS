import { Router } from 'express';
import auth from './auth.js';
import protectd from './protected.js';
import profile from './profile.js';
import staff from './staff.js';
import supplier from './supplier.js';
import inventory from './inventory.js';
import order from './order.js';
import retailer from './retailer.js';
const router = Router();

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});
router.use(auth);
router.use(protectd);
router.use(profile);
router.use(staff);
router.use(supplier);
router.use(inventory);
router.use(order);
router.use(retailer);

export default router;
