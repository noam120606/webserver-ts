import { Router } from 'express';
import authRoutes from './auth/login';

const router : Router = Router();

router.use('/auth', authRoutes);

export default router;