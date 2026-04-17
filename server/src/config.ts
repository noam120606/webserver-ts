import { Store } from 'express-session';
import { Sequelize } from 'sequelize';
import connectSessionSequelize from 'connect-session-sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'mydb',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '', {
        host: process.env.MYSQL_HOST || 'localhost',
        port: Number(process.env.MYSQL_PORT) || 3306,
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false,
    }
);

const SessionStore = connectSessionSequelize(Store);
const sessionStore = new SessionStore({ db: sequelize });
sessionStore.sync();

export default {

    port: process.env.PORT || 3000,

    cors: process.env.NODE_ENV === 'production' ? {
        origin: 'https://your-production-domain.com', // CHANGE HERE
        optionsSuccessStatus: 200,
    } : {
        origin: '*',
    },

    session: {
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
        store: sessionStore,
    },
    
};