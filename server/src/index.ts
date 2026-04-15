import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';

declare module 'express-session' {
    interface SessionData {
        authenticated?: boolean;
    }
}

import log from './utils/logger';
import config from './config';
dotenv.config({ path: './.env' });

import logMiddleware from './middlewares/log';
import authVerifMiddleware from './middlewares/authverif';

const app : Application = express();
app.use(cors(config.cors));
app.use(express.json());
app.use(session(config.session));
app.use(logMiddleware());
app.set('trust proxy', process.env.TRUST_PROXY === 'true');

// Public route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use(authVerifMiddleware());

// Protected route
app.get('/protected', (req: Request, res: Response) => {
    res.send('This is a protected route!');
});

app.listen(config.port, () => {
    log({
        level: 'info',
        message: `Server is running on port ${config.port}`
    });
});