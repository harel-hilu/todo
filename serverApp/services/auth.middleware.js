import { v4 } from "uuid";

export const validateUser = (req, res, next) => {
    const userIdCookieName = "todoUserId";
    req.userId = req.cookies[userIdCookieName];
    
    if (!req.userId) {
        req.userId = v4();
        res.cookie(userIdCookieName, req.userId);
    } 

    next();
}