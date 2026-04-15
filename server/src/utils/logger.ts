declare interface LogEntry {
    level: 'info' | 'debug' | 'warn' | 'error' | 'fatal';
    message: string;
    meta?: any;
}

declare type Logger = (entry: LogEntry) => void;

export const log : Logger = (entry: LogEntry) => {

    const timestamp : string = new Date().toLocaleString();
    const message : string = `[${timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;

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