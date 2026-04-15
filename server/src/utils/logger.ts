import { LogEntry, Logger } from "~/types/log";

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