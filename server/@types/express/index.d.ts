declare namespace Express {
    interface Request {
        userId?: string;
        cookies?: [key: string, value: string];
        body?: any;
        params?: any;
    }
}