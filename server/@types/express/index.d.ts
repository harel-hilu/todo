import { sortAndDeduplicateDiagnostics } from "typescript";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            cookies?: [key: string, value: string];
            body?: any;
            params?: any;
        }
    }
}