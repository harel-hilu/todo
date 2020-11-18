declare namespace Express {
    export interface Request {
       userId?: string;
       cookies?: [key: string, value: string];
       body?: any;
       params?: any;
    }

    export interface Response {
        cookie?: (a: string, b: string) => void;
        render?: (url: string, data: any) => void;
        status?: (code: number) => Response;
        send?: (any?) => void;
     }
 }