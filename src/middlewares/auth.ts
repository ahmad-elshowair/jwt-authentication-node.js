import { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/error';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const handle_unauthenticated = (next: NextFunction) => {
    const error: Error = new Error('OOPs not Logged in');
    error.status = 401;
    next(error);
};

const authenticate_user = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const header_auth = req.get('Authorization');
        if (header_auth) {
            const bearer = header_auth.split(' ')[0].toLowerCase();
            const token = header_auth.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decoded = jwt.verify(token, config.token_secret);
                if (decoded) {
                    next();
                } else {
                    // failed to authenticate user
                    handle_unauthenticated(next);
                }
            } else {
                // not a bearer token
                handle_unauthenticated(next);
            }
        } else {
            // not token provided
            handle_unauthenticated(next);
        }
    } catch (error) {
        handle_unauthenticated(next);
    }
};

export default authenticate_user;
