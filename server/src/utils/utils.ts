import path from "node:path";

export function sleep(ms: number) : Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isCompiled() : boolean {
    return path.extname(__filename) === '.js';
}