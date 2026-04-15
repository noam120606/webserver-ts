import { Request, Response } from "express";

declare interface Route {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    handler: (req: Request, res: Response) => void;
}

export type { Route };