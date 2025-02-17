// imports
import type { Request, Response, NextFunction } from 'express'; // defines middlware types for req, res and next
import jwt from 'jsonwebtoken'; // handles jwt verification

interface JwtPayload extends Request { // payload structure
    username: string;
    
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload; 
    }
}



export const authenticateToken = ( //export middle ware function with params req,res,next 
    req: Request,
    res: Response,
    next: NextFunction 
) => {
    const authHeader = req.headers.authorization; // variable for header authorization request 

    if(authHeader) { // retrieves authorization header from request 
        const token = authHeader.split(' ')[1];

        const secretKey = process.env.JWT_SECRET_KEY || '';

        jwt.verify(token, secretKey, (err, user) => { // checks if token is valid
            if(err) {
                return res.sendStatus(403).json({message:"Token is invalid or expired!"}); // sends error is is token is invalid or expired 
            }

            req.user = user as JwtPayload;
            return next();
        });
        } else {
            res.sendStatus(401).json({message:"No Token, authentication required!"}); // sends error requireing authentication
        }
    };
