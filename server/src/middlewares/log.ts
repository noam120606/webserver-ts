import { Request, Response, NextFunction, RequestHandler } from 'express';
import log, { LogLevel } from '../utils/logger';

const logMiddleware = (): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            
            let level: LogLevel = 'info';
            if (res.statusCode >= 500) level = 'error';
            else if (res.statusCode >= 400) level = 'warn';

            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
            const message = `[${ip}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

            log({ level, message });
        });

        next();
    };
};

export default logMiddleware;