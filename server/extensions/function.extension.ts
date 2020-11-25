interface Function {
    promisify: (thisArg: any, ...args: any[]) => Promise<any>;
}

// Takes a function following the common error-first callback style, and returns a version that returns promises.
Function.prototype.promisify = function(thisArg: any, ...args: any[]): Promise<any> {
    return new Promise((res, rej) => {
        this.call(thisArg, ...args, (error: any, success: any) => 
            error ? rej(error) : res(success));
    });
}