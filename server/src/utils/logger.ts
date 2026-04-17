export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
    level: LogLevel;
    message: string;
    meta?: unknown;
}

const COLOR_MAP: Record<LogLevel, string> = {
    info: '\x1b[32m',  // Green
    debug: '\x1b[34m', // Blue
    warn: '\x1b[33m',  // Yellow
    error: '\x1b[31m', // Red
    fatal: '\x1b[35m'  // Magenta
};

const RESET = '\x1b[0m';
const IS_DEBUG = process.env.DEBUG === 'true';

export const log = (entry: LogEntry): void => {

    if (entry.level === 'debug' && !IS_DEBUG) return;

    const timestamp = new Date().toISOString();
    const color = COLOR_MAP[entry.level];
    
    const header = `[${timestamp}] [${color}${entry.level.toUpperCase()}${RESET}]`;
    const fullMessage = `${header} ${entry.message}`;

    if (entry.level === 'error' || entry.level === 'fatal') {
        entry.meta ? console.error(fullMessage, entry.meta) : console.error(fullMessage);
    } else {
        entry.meta ? console.log(fullMessage, entry.meta) : console.log(fullMessage);
    }

};

export default log;