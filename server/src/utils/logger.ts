declare interface LogEntry {
    level: 'info' | 'debug' | 'warn' | 'error' | 'fatal';
    message: string;
    meta?: any;
}

declare type Logger = (entry: LogEntry) => void;

export const log : Logger = (entry: LogEntry) => {

    if (entry.level === 'debug' && process.env.DEBUG !== 'true') {
        return;
    }

    const colorMap : { [key in LogEntry['level']]: string } = {
        info: '\x1b[32m', // Green
        debug: '\x1b[34m', // Blue
        warn: '\x1b[33m', // Yellow
        error: '\x1b[31m', // Red
        fatal: '\x1b[35m'  // Magenta
    };

    const color : string = colorMap[entry.level];
    const reset : string = '\x1b[0m';

    const timestamp : string = new Date().toLocaleString();
    const message : string = `[${timestamp}] [${color}${entry.level.toUpperCase()}${reset}] ${entry.message}`;

    const logFunction : Function = ['error', 'fatal'].includes(entry.level) ? console.error : console.log;

    if (entry.meta) {
        logFunction(message, entry.meta);
    } else {
        logFunction(message);
    }

    if (entry.level === 'fatal') {
        process.exit(1);
    }

};

export { LogEntry, Logger };
export default log;