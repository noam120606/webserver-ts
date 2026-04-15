import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

declare module 'express-session' {
    interface SessionData {
        authenticated?: boolean;
    }
}

import log from './utils/logger';
import config from './config';



const app : Application = express();
app.use(cors(config.cors));
app.use(express.json());
app.use(session(config.session));
app.use(express.static(path.join(__dirname, '../frontend')));
app.set('trust proxy', process.env.TRUST_PROXY === 'true');

import logMiddleware from './middlewares/log';
import apiRoutes from './api';
app.use(logMiddleware());
app.use('/api', apiRoutes);

// Frontend route
app.get(/.*/, (req: Request, res: Response) => {
    // On construit le chemin absolu vers le fichier
    const indexPath = path.resolve(__dirname, '..', 'frontend', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Lecture FS impossible :", err);
            return res.status(500).send("Erreur de lecture disque");
        }
        res.send(data);
    });
});

app.listen(config.port, () => {
    log({
        level: 'info',
        message: `Server is running on port ${config.port}`
    });
});