declare namespace Express {
    export interface Request {
       userId?: string;
       cookies?: [key: string, value: string];
    }

    export interface Response {
        cookie?: (a: string, b: string) => void;
     }
 }