import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';

const authVerif = (req: Request, res: Response) : boolean => {
    if (!req.session || !req.session.authenticated) {
        res.status(401).json({ ok: false, error: 'Unauthorized' });
        log({
            level: 'warn',
            message: `[${req.ip}] Unauthorized access attempt to "${req.originalUrl}"`
        });
        return false;  // Unauthorized
    }
    return true;  // Authorized
};

export default authVerif;