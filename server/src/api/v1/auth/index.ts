import { Router } from 'express';
import loginRoute from './login';

const router : Router = Router();

router.use('/login', loginRoute);

export default router;