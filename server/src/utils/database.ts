import mysql, { Pool } from 'mysql2/promise';
import fs from 'fs/promises'; // Version promise de fs pour ne pas bloquer l'event loop
import path from 'path';
import log from './logger';

class Database {
    private pool: Pool;
    public online: boolean = false;

    async connect() {
        try {
            this.pool = mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
                waitForConnections: true,
                connectionLimit: 10, // Jusqu'à 10 requêtes simultanées
                queueLimit: 0
            });

            await this.pool.getConnection();
            log({ level: 'info', message: 'Connected to MySQL Pool' });
            await this.init();
            this.online = true;
        } catch (error) {
            log({ level: 'fatal', message: 'Failed to connect to MySQL', meta: { error } });
        }
    }

    async query<T = any>(sql: string, values?: any[]): Promise<T> {
        if (!this.pool) throw new Error("Database not initialized");

        try {
            const [rows] = await this.pool.query(sql, values);
            return rows as T;
        } catch (error) {
            log({ level: 'error', message: `SQL Error: ${sql}`, meta: { values, error } });
            throw error;
        }
    }

    async init() {
        try {
            const initSqlPath = path.resolve(__dirname, '..', 'assets', 'setup.sql');
            const initSql = await fs.readFile(initSqlPath, 'utf8');

            // On sépare par ; mais on fait attention aux commentaires
            const queries = initSql
                .replace(/\/\*[\s\S]*?\*\/|--.*$/gm, '') // Nettoyage commentaires
                .split(';')
                .map(q => q.trim())
                .filter(q => q.length > 0);

            for (const q of queries) {
                await this.query(q);
            }

            log({ level: 'info', message: 'Database initialized' });
        } catch (error) {
            log({ level: 'fatal', message: 'Init failed', meta: { error } });
            throw error;
        }
    }

    async close() {
        if (this.pool) await this.pool.end();
    }
}

export default new Database();