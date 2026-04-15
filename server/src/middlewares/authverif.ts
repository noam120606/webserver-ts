import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';

const authVerifMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.authenticated) {
        res.status(401).json({ ok: false, error: 'Unauthorized' });
        log({
            level: 'warn',
            message: `[${req.ip}] Unauthorized access attempt to "${req.originalUrl}"`
        });
        return;
    }
    next();
};

export default authVerifMiddleware;