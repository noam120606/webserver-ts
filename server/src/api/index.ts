import { Router, Request, Response } from 'express';
import v1Routes from './v1';

const router = Router();

router.use('/v1', v1Routes);

router.get('/health', (req : Request, res : Response) => {
    res.status(200).json({ ok: true, message: 'Api is running' });
});

router.use(/.*/, (req : Request, res : Response) => {
    res.status(404).json({
        ok: false,
        message: `Endpoint not Found\nRequested URL: ${req.originalUrl}`
    });
});

export default router;