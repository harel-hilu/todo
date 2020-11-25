import { v4 } from "uuid";
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export const validateUser = 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const userIdCookieName: string = "todoUserId";
    const userIdToken: string = req.cookies[userIdCookieName];
    
    if (!userIdToken) {
        const user = {
            userId : v4()
        }
        
        req.userId = user.userId;
        const userIdToken = jwt.sign(user, process.env.TOKEN_SECRET);
        res.cookie(userIdCookieName, userIdToken);
    } else {
        try {
            const decodedUserToken = await jwt.verify
            .promisify(null, userIdToken, process.env.TOKEN_SECRET);
            req.userId = decodedUserToken.userId;
        } catch (error) {
            console.log(error);
            res.status(401).send("You have no access!");
        }
    }
    
    next();
}