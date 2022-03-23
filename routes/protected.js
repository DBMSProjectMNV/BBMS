import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
const router = Router();

router.get('/dashboard', checkLogin, (req, res) => {
  res.render('dashboard', { role: req.user.role });
});

export default router;
