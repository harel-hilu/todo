import { sortAndDeduplicateDiagnostics } from "typescript";

declare global {
    interface Function {
        promisify: (thisArg: any, ...args: any[]) => Promise<any>;
    }
}