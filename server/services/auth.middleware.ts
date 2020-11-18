import { v4 } from "uuid";
import { Request, Response, NextFunction } from 'express';

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const userIdCookieName: string = "todoUserId";
    req.userId = req.cookies[userIdCookieName];
    
    if (!req.userId) {
        req.userId = v4();
        res.cookie(userIdCookieName, req.userId);
    } 

    next();
}