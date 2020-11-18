import { v4 } from "uuid";

export const validateUser = (req: Express.Request, res: Express.Response, next): void => {
    const userIdCookieName: string = "todoUserId";
    req.userId = req.cookies[userIdCookieName];
    
    if (!req.userId) {
        req.userId = v4();
        res.cookie(userIdCookieName, req.userId);
    } 

    next();
}