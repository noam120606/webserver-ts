import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

import log from './utils/logger';
import config from './config';
import database from './utils/database';

const app : Application = express();
app.use(cors(config.cors));
app.use(express.json());
app.use(session(config.session));
app.set('trust proxy', process.env.TRUST_PROXY === 'true');
app.set('db', database);

import logMiddleware from './middlewares/log';
import apiRoutes from './api';

app.use(logMiddleware());
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get(/.*/, (req: Request, res: Response) => { // Frontend catch-all route
    const indexPath = path.resolve(__dirname, '..', 'frontend', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Lecture FS impossible :", err);
            return res.status(500).send("Erreur de lecture disque");
        }
        res.send(data);
    });
});

(async () => {
    await database.connect();
    app.listen(config.port, () => {
        log({
            level: 'info',
            message: `Webserver is running on port ${config.port}`
        });
    });
})();