import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';

const logMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        log({
            level: 'info',
            message: `[${req.ip}] ${req.method} "${req.originalUrl}" ${res.statusCode} (${duration}ms)`
        });
    });        
    next();
};

export default logMiddleware;