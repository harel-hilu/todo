declare interface Function {
    promisify: (thisArg: any, ...args: any[]) => Promise<any>;
}