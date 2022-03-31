import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
const router = Router();

router.get('/dashboard', checkLogin, (req, res) => {
  res.render('dashboard', { name: (req.user && req.user.name) || 'anonymous' });
});

export default router;
