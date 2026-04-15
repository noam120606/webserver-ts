declare interface LogEntry {
    level: 'info' | 'debug' | 'warn' | 'error' | 'fatal';
    message: string;
    meta?: any;
}

declare type Logger = (entry: LogEntry) => void;

declare module 'logger' {
    export const logger: Logger;
}

export type { LogEntry, Logger };