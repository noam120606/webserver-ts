import mysql, { Connection, QueryResult } from 'mysql2/promise';
import { sleep } from './utils';
import log from './logger';

class Database {
    private connection: Connection;
    public online: boolean = false;

    public get conn() { return this.connection; }

    async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306
            });
            log({
                level: 'info',
                message: 'Connected to MySQL database'
            });
            this.online = true;
        } catch (error) {
            log({
                level: 'fatal',
                message: 'Failed to connect to MySQL database',
                meta: { error }
            });
        }
    }

    async query(sql: string, values?: any[]) : Promise<any> {
        if (!this.online) {
            log({
                level: 'warn',
                message: 'Attempting to query MySQL while offline'
            });
            return null;
        }

        try {
            const [rows] = await this.connection.query(sql, values);
            log({
                level: 'debug',
                message: `Executed SQL: ${sql}`,
                meta: { values }
            });
            return rows;
        } catch (error) {
            log({
                level: 'error',
                message: `Error executing SQL: ${sql}`,
                meta: { values, error }
            });
            throw error;
        }
    }

    async close() {
        await this.connection.end();
    }
}

export default new Database();